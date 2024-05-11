import React from 'react';
import { render } from '@testing-library/react';
import { DashBoardView } from '../DashBoardView';

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
      .mockReturnValueOnce({ isMobile: false }),
    useNotification: jest.fn()
  };
});

jest.mock('src/contexts/AuthContext', () => {
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

describe('DashBoardView', () => {
  it('renders DashBoardView with mobile view', () => {
    const component = render(<DashBoardView />);
    expect(component).toMatchSnapshot();
  });

  it('renders DashBoardView with desktop view', () => {
    const component = render(<DashBoardView />);
    expect(component).toMatchSnapshot();
  });
});
