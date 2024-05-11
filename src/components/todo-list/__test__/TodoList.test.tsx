import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoList } from '..';
import { todo } from 'src/__mocks__';
import { CategoryType } from 'src/types';

jest.mock('next/navigation', () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn()
    })
  };
});

describe('Test TodoList component', () => {
  test.only('should match its snapshot', async () => {
    const component = render(
      <TodoList
        todoListCategoryType={CategoryType.Important}
        todoList={[todo, { ...todo, completed: true }]}
        handleCompleteTodo={jest.fn()}
        handleDeleteTodo={jest.fn()}
        handleUpdateTodo={jest.fn()}
        onDragEnd={jest.fn()}
        onDragStart={jest.fn()}
        onDragOver={jest.fn()}
        handleAddTodoItem={jest.fn()}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
