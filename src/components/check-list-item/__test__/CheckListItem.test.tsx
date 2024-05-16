import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CheckListItem } from '..';

describe('Test CheckListItem component', () => {
  test.only('should match its snapshot', async () => {
    const component = render(<CheckListItem title='title' isChecked color={'blue'} handleCompleted={jest.fn()} handleDelete={jest.fn()} />);

    expect(component).toMatchSnapshot();
  });

  test.only('should match its snapshot without check', async () => {
    const component = render(<CheckListItem title='title' isChecked={false} color={'blue'} handleCompleted={jest.fn()} handleDelete={jest.fn()} />);

    expect(component).toMatchSnapshot();
  });
});
