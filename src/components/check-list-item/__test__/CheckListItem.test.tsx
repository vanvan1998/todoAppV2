import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CheckListItem } from '..';

describe('Test CheckListItem component', () => {
  test.only('should match its snapshot', async () => {
    const component = render(<CheckListItem title='title' count={2} color='blue' />);

    expect(component).toMatchSnapshot();
  });

  test.only('should match its snapshot without color', async () => {
    const component = render(<CheckListItem title='title' count={2} color='' />);

    expect(component).toMatchSnapshot();
  });
});
