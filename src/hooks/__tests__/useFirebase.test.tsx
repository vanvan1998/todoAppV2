import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useFirebase } from '../useFirebase';
import { todo } from 'src/__mocks__';

jest.mock('src/contexts', () => {
  return {
    useAuth: jest.fn().mockReturnValue({
      currentUser: { displayName: 'displayName', email: 'email', userId: 'j3WklyoTrBg4E1GKNz0Gn0az34V2' },
      logout: jest.fn()
    })
  };
});

jest.mock('firebase/firestore', () => {
  const originalModule = jest.requireActual('firebase/firestore');

  return {
    ...originalModule,
    addDoc: jest.fn(),
    getDoc: jest.fn().mockReturnValue({ data: () => todo }),
    updateDoc: jest.fn().mockReturnValue({ data: () => todo })
  };
});

describe('useFirebase', () => {
  it('renders useFirebase with desktop view', () => {
    const { result } = renderHook(() => useFirebase());
    result.current.handleAddTodoItem({
      title: 'van test',
      detail: 'van test',
      notification: false,
      startDate: '',
      startTime: '',
      category: 1
    });
    result.current.handleUpdateTodo({
      todo: {
        notification: false,
        completed: true,
        detail: 'aaaa',
        category: 1,
        id: 'DdIH5j2NvblSnQuWPJr2',
        startTime: '',
        email: 'nguyensivan1998@gmail.com',
        createdAt: '2024-05-10T16:32:21',
        userId: '6ErBBP2f9hOq4lh5KgJocI9pphR2',
        startDate: '',
        title: 'aaa'
      },
      fieldsToUpdate: {
        title: 'aaa',
        detail: 'vvvvv',
        notification: false,
        category: 1,
        startDate: '',
        startTime: ''
      }
    });
    result.current.handleCompleteTodo({
      notification: false,
      completed: true,
      detail: 'aaaa',
      category: 1,
      id: 'DdIH5j2NvblSnQuWPJr2',
      startTime: '',
      email: 'nguyensivan1998@gmail.com',
      createdAt: '2024-05-10T16:32:21',
      userId: '6ErBBP2f9hOq4lh5KgJocI9pphR2',
      startDate: '',
      title: 'aaa'
    });
    result.current.handleDeleteTodoItem('DdIH5j2NvblSnQuWPJr2');
    result.current.findTodoItem('DdIH5j2NvblSnQuWPJr2');
    console.log(result.current);
  });
});
