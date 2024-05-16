import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CheckList } from '..';
import { todo } from 'src/__mocks__';

describe('Test TodoDetailItem component', () => {
  test.only('should match its snapshot', async () => {
    const component = render(
      <CheckList
        todo={todo}
        handleCompleteTodo={jest.fn()}
        handleDeleteTodo={jest.fn()}
        handleUpdateTodo={jest.fn()}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test.only('should render completed todo snapshot', async () => {
    const component = render(
      <CheckList
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
      />
    );

    expect(component).toMatchSnapshot();
  });
});
