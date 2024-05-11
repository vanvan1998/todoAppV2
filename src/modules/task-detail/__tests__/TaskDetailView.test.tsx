import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { TaskDetailView } from '../TaskDetailView';

jest.mock('@next/third-parties/google', () => {
  return {
    GoogleAnalytics: () => <>GoogleAnalytics</>
  };
});

jest.mock('src/hooks', () => {
  const originalModule = jest.requireActual('src/hooks');
  return {
    ...originalModule,
    useMediaQuery: jest
      .fn()
      .mockReturnValue({
        isMobile: true
      })
      .mockReturnValueOnce({ isMobile: false }),
    useNotification: jest.fn(),
    useFirebase: jest.fn().mockReturnValue({
      findTodoItem: jest.fn().mockResolvedValue({
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
      }),
      handleUpdateTodo: jest.fn(),
      handleCompleteTodo: jest.fn(),
      handleDeleteTodoItem: jest.fn()
    })
  };
});

jest.mock('src/contexts/AuthContext', () => {
  return {
    useAuth: jest.fn().mockReturnValue({ currentUser: undefined, signIn: jest.fn() })
  };
});

jest.mock('next/navigation', () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn()
    })
  };
});

describe('TaskDetailView', () => {
  it('renders TaskDetailView with mobile view', async () => {
    const component = render(<TaskDetailView params={{ taskId: '123' }} />);

    await waitFor(() => {
      expect(component).toMatchSnapshot();
    });
  });

  it('renders TaskDetailView with desktop view', async () => {
    const component = render(<TaskDetailView params={{ taskId: '123' }} />);

    await waitFor(() => {
      const editButton = component.getByTestId('edit-todo-button');
      const deleteButton = component.getByTestId('delete-todo-button');
      const completeButton = component.getByTestId('complete-todo-button');
      fireEvent.click(editButton);
      fireEvent.click(deleteButton);
      fireEvent.click(completeButton);
      expect(component).toMatchSnapshot();
    });
  });
});
