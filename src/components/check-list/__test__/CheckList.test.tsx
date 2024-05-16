import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CheckList } from '..';
import { todo } from 'src/__mocks__';

describe('Test TodoDetailItem component', () => {
  test.only('should match its snapshot', async () => {
    const component = render(
      <CheckList
        todo={{
          ...todo,
          checkList: [
            {
              completed: true,
              title: 'vvvvv'
            }
          ]
        }}
        isMobile
        handleCompleteTodo={jest.fn()}
        handleDeleteTodo={jest.fn()}
        handleUpdateTodo={jest.fn()}
      />
    );

    const checkButton = component.getByTestId('check-button');
    fireEvent.click(checkButton);

    const deleteButton = component.getByTestId('delete-check-button');
    fireEvent.click(deleteButton);

    expect(component).toMatchSnapshot();
  });

  test.only('should handle uncheck checklist', async () => {
    const component = render(
      <CheckList
        todo={{
          ...todo,
          checkList: [
            {
              completed: false,
              title: 'vvvvv'
            }
          ]
        }}
        isMobile
        handleCompleteTodo={jest.fn()}
        handleDeleteTodo={jest.fn()}
        handleUpdateTodo={jest.fn()}
      />
    );

    const checkButton = component.getByTestId('uncheck-button');
    fireEvent.click(checkButton);

    const deleteButton = component.getByTestId('delete-check-button');
    fireEvent.click(deleteButton);

    expect(component).toMatchSnapshot();
  });

  test.only('should render empty checklist todo snapshot', async () => {
    const component = render(
      <CheckList
        todo={todo}
        isMobile={false}
        handleCompleteTodo={jest.fn()}
        handleDeleteTodo={jest.fn()}
        handleUpdateTodo={jest.fn()}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
