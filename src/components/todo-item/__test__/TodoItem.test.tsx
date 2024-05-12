import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoItem } from '..';
import { todo } from 'src/__mocks__';

jest.mock('next/navigation', () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn()
    })
  };
});

describe('Test TodoItem component', () => {
  test.only('should match its snapshot', async () => {
    const component = render(
      <TodoItem
        todo={todo}
        handleCompleteTodo={jest.fn()}
        handleDeleteTodo={jest.fn()}
        handleUpdateTodo={jest.fn()}
        onDragEnd={jest.fn()}
        onDragStart={jest.fn()}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test.only('should render completed todo snapshot', async () => {
    const component = render(
      <TodoItem
        todo={{
          ...todo,
          notification: false,
          createdAt: '2024-05-10T01:14:38',
          startTime: '01:00:21',
          startDate: '05/10/2026',
          category: 2,
          completed: true,
          userId: 'j3WklyoTrBg4E1GKNz0Gn0az34V2'
        }}
        handleCompleteTodo={jest.fn()}
        handleDeleteTodo={jest.fn()}
        handleUpdateTodo={jest.fn()}
        onDragEnd={jest.fn()}
        onDragStart={jest.fn()}
      />
    );

    const button = component.getByTestId('task-details-button');
    fireEvent.click(button);

    const completeButton = component.getByTestId('complete-button');
    fireEvent.click(completeButton);

    const editButton = component.getByTestId('edit-button');
    fireEvent.click(editButton);
    fireEvent.click(editButton);

    const deleteButton = component.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    expect(component).toMatchSnapshot();
  });
});
