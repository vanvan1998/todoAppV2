import React from 'react';
import { render } from '@testing-library/react';
import { SignIn } from '../SignIn';

jest.mock('@next/third-parties/google', () => {
  return {
    GoogleAnalytics: () => <>GoogleAnalytics</>
  };
});

jest.mock('src/hooks', () => {
  const originalModule = jest.requireActual('src/hooks');
  return {
    ...originalModule,
    useMediaQuery: jest
      .fn()
      .mockReturnValue({
        isMobile: true
      })
      .mockReturnValueOnce({ isMobile: false })
  };
});

jest.mock('src/contexts', () => {
  return {
    useAuth: jest.fn().mockReturnValue({ currentUser: undefined, signIn: jest.fn() })
  };
});

jest.mock('next/navigation', () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn()
    })
  };
});

describe('SignIn', () => {
  it('renders SignIn with mobile view', () => {
    const component = render(<SignIn />);
    expect(component).toMatchSnapshot();
  });

  it('renders SignIn with desktop view', () => {
    const component = render(<SignIn />);
    expect(component).toMatchSnapshot();
  });
});
