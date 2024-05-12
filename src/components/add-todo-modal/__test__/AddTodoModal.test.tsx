import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddTodoModal } from '..';

jest.mock('src/hooks', () => {
  const originalModule = jest.requireActual('src/hooks');
  return {
    ...originalModule,
    useMediaQuery: jest.fn().mockReturnValue({
      isMobile: true
    })
  };
});

describe('Test AddTodoModal component', () => {
  test('should match its snapshot', async () => {
    const component = render(<AddTodoModal addItem={jest.fn()} isButton />);
    const showModalButton = component.getByTestId('show-modal-button');
    fireEvent.click(showModalButton);
    expect(component).toMatchSnapshot();
  });
});
