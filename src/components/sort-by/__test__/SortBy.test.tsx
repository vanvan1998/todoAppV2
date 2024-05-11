import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SortBy } from '..';
import { SORT_BY } from 'src/constants';

describe('Test SortBy component', () => {
  test.only('should match its snapshot', async () => {
    const component = render(<SortBy sortType={SORT_BY.NEWEST} handleSort={jest.fn()} />);

    const button = component.getByTestId('sort-by-button');
    fireEvent.click(button);
    expect(component).toMatchSnapshot();
  });
});
