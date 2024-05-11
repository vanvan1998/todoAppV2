import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Layout } from '..';

jest.mock('src/hooks', () => {
  const originalModule = jest.requireActual('src/hooks');
  return {
    ...originalModule,
    useMediaQuery: jest.fn().mockReturnValue({
      isMobile: true
    })
  };
});

describe('Test Layout component', () => {
  test('should match its snapshot', async () => {
    const component = render(<Layout>Test Layout</Layout>);
    expect(component).toMatchSnapshot();
  });
});
