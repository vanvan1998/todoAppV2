import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddTodo } from '..';
import { MODE } from '../../../constants';
import { todo } from 'src/__mocks__';

jest.mock('src/hooks', () => {
  const originalModule = jest.requireActual('src/hooks');
  return {
    ...originalModule,
    useMediaQuery: jest
      .fn()
      .mockReturnValue({
        isMobile: true
      })
      .mockReturnValueOnce({
        isMobile: false
      })
  };
});

describe('Test AddTodo component', () => {
  test('should match AddTodo snapshot', async () => {
    const component = render(<AddTodo mode={MODE.ADD} addItem={jest.fn()} onComplete={jest.fn()} />);

    const upcomingButton = component.getByTestId('upcoming-button');
    const importantButton = component.getByTestId('important-button');
    const urgentButton = component.getByTestId('urgent-button');
    const addButton = component.getByTestId('add-todo-button');
    fireEvent.click(upcomingButton);
    fireEvent.click(importantButton);
    fireEvent.click(urgentButton);
    fireEvent.click(addButton);
    expect(component).toMatchSnapshot();
  });
  test('should match update todo snapshot with desktop view', async () => {
    const component = render(
      <AddTodo mode={MODE.UPDATE} todo={todo} addItem={jest.fn()} onComplete={jest.fn()} updateItem={jest.fn()} />
    );

    const upcomingButton = component.getByTestId('upcoming-button');
    const importantButton = component.getByTestId('important-button');
    const urgentButton = component.getByTestId('urgent-button');
    const addButton = component.getByTestId('add-todo-button');
    fireEvent.click(upcomingButton);
    fireEvent.click(importantButton);
    fireEvent.click(urgentButton);
    fireEvent.click(addButton);
    expect(component).toMatchSnapshot();
  });
});
