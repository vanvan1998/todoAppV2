import React from 'react';
import { render } from '@testing-library/react';
import { AuthProvider } from '../AuthContext';

jest.mock('@next/third-parties/google', () => {
  return {
    GoogleAnalytics: () => <>GoogleAnalytics</>
  };
});

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

describe('AuthContext', () => {
  it('renders AuthProvider with desktop view', () => {
    const component = render(<AuthProvider>Provider</AuthProvider>);
    expect(component).toMatchSnapshot();
  });
});
