import React from 'react';
import { render } from '@testing-library/react';
import { ForgotPassword } from '../ForgotPassword';

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

describe('ForgotPassword', () => {
  it('renders ForgotPassword with mobile view', () => {
    const component = render(<ForgotPassword />);
    expect(component).toMatchSnapshot();
  });

  it('renders ForgotPassword with desktop view', () => {
    const component = render(<ForgotPassword />);
    expect(component).toMatchSnapshot();
  });
});
