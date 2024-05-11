import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddTodo } from '..';
import { MODE } from '../../../constants';
import { todo } from 'src/__mocks__';

jest.mock('src/hooks', () => {
  const originalModule = jest.requireActual('src/hooks');
  return {
    ...originalModule,
    useMediaQuery: jest.fn().mockReturnValue({
      isMobile: true
    })
  };
});

describe('Test AddTodo component', () => {
  test('should match AddTodo snapshot', async () => {
    const component = render(<AddTodo mode={MODE.ADD} addItem={jest.fn()} onComplete={jest.fn()} />);
    expect(component).toMatchSnapshot();
  });
  test('should match update todo snapshot', async () => {
    const component = render(<AddTodo mode={MODE.UPDATE} todo={todo} addItem={jest.fn()} onComplete={jest.fn()} />);
    expect(component).toMatchSnapshot();
  });
});
