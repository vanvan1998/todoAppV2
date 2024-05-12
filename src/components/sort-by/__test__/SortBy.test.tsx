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

    const sortByOldestButton = component.getByTestId('sort-by-oldest-button');
    fireEvent.click(sortByOldestButton);

    fireEvent.click(button);
    const sortByNewestButton = component.getByTestId('sort-by-newest-button');
    fireEvent.click(sortByNewestButton);

    fireEvent.click(button);
    const sortByNoneButton = component.getByTestId('sort-by-none-button');
    fireEvent.click(sortByNoneButton);
    expect(component).toMatchSnapshot();
  });
});
