import { renderHook } from '@testing-library/react';
import { useNotification } from '../useNotification';

globalThis.Notification = {
  requestPermission: jest
    .fn()
    .mockResolvedValue('granted')
    .mockResolvedValueOnce('denied')
    .mockResolvedValueOnce('denied'),
  permission: 'granted'
} as unknown as jest.Mocked<typeof Notification>;

jest.mock('../useFirebase', () => {
  return {
    useFirebase: jest
      .fn()
      .mockReturnValue({
        todoList: [
          {
            email: 'nguyensivan1998+102@gmail.com',
            id: '82zB2At6gnxs0SbDJ8SW',
            notification: false,
            createdAt: '2024-05-10T01:14:38',
            title: '333333',
            detail: '3333333',
            startTime: '01:00:21',
            startDate: '05/10/2024',
            category: 1,
            completed: false,
            userId: 'j3WklyoTrBg4E1GKNz0Gn0az34V2'
          }
        ],
        handleUpdateTodo: jest.fn()
      })
      .mockReturnValueOnce({
        todoList: [
          {
            email: 'nguyensivan1998+102@gmail.com',
            id: '82zB2At6gnxs0SbDJ8SW',
            notification: true,
            createdAt: '2024-05-10T01:14:38',
            title: '333333',
            detail: '3333333',
            startTime: '01:00:21',
            startDate: '05/10/2024',
            category: 1,
            completed: false,
            userId: 'j3WklyoTrBg4E1GKNz0Gn0az34V2'
          }
        ],
        handleUpdateTodo: jest.fn()
      })
  };
});

describe('useNotification', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should return initial state', () => {
    renderHook(() => useNotification());
    jest.runOnlyPendingTimers();
    expect(global.Notification.requestPermission).toHaveBeenCalledTimes(2);
  });

  it('should return denied initial state', () => {
    renderHook(() => useNotification());
    jest.runOnlyPendingTimers();
    expect(global.Notification.requestPermission).toHaveBeenCalledTimes(3);
  });
});
