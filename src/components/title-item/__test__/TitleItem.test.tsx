import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TitleItem } from '..';

describe('Test TitleItem component', () => {
  test.only('should match its snapshot', async () => {
    const component = render(<TitleItem title='title' count={2} color='blue' />);

    expect(component).toMatchSnapshot();
  });

  test.only('should match its snapshot without color', async () => {
    const component = render(<TitleItem title='title' count={2} color='' />);

    expect(component).toMatchSnapshot();
  });
});
