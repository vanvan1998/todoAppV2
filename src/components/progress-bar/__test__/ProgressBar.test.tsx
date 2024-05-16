import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProgressBar } from '..';

describe('Test ProgressBar component', () => {
  test.only('should match its snapshot', async () => {
    const component = render(<ProgressBar count={2} color='blue' />);

    expect(component).toMatchSnapshot();
  });
});
