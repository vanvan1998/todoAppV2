import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Search } from '..';

describe('Test Search component', () => {
  test.only('should match its snapshot', async () => {
    const component = render(<Search searchString='searchString' handleSearch={jest.fn()} />);
    const input = screen.getByLabelText('Search');
    fireEvent.change(input, { target: { value: '123' } });

    expect(component).toMatchSnapshot();
  });
});
