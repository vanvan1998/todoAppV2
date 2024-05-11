import React from 'react';
import { render } from '@testing-library/react';
import { ChangePasswordView } from '../ChangePasswordView';

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

jest.mock('src/contexts/AuthContext', () => {
  return {
    useAuth: jest
      .fn()
      .mockReturnValue({ currentUser: { displayName: 'displayName', email: 'email' }, logout: jest.fn() })
  };
});

jest.mock('next/navigation', () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn()
    })
  };
});

describe('ChangePasswordView', () => {
  it('renders ChangePasswordView with mobile view', () => {
    const component = render(<ChangePasswordView />);
    expect(component).toMatchSnapshot();
  });

  it('renders ChangePasswordView with desktop view', () => {
    const component = render(<ChangePasswordView />);
    expect(component).toMatchSnapshot();
  });
});
