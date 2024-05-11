import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PrivateLayout } from '..';

jest.mock('src/hooks', () => {
  const originalModule = jest.requireActual('src/hooks');
  return {
    ...originalModule,
    useMediaQuery: jest.fn().mockReturnValue({
      isMobile: true
    })
  };
});

jest.mock('next/navigation', () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn()
    })
  };
});

describe('Test PrivateLayout component', () => {
  test('should match private its snapshot', async () => {
    const component = render(<PrivateLayout>Test Layout</PrivateLayout>);
    expect(component).toMatchSnapshot();
  });

  test('should match its snapshot', async () => {
    const component = render(<PrivateLayout isPrivate={false}>Test Layout</PrivateLayout>);
    expect(component).toMatchSnapshot();
  });
});
