import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { UpdateProfileView } from '../UpdateProfileView';

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
    useAuth: jest
      .fn()
      .mockReturnValue({ currentUser: { displayName: 'displayName', email: 'email' }, updateProfile: jest.fn() })
  };
});

jest.mock('next/navigation', () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn()
    })
  };
});

describe('UpdateProfileView', () => {
  it('renders UpdateProfileView with mobile view', () => {
    const component = render(<UpdateProfileView />);
    expect(component).toMatchSnapshot();
  });

  it('renders UpdateProfileView with desktop view', () => {
    const component = render(<UpdateProfileView />);

    const button = component.getByTestId('update-avatar-button');
    const updateButton = component.getByTestId('update-button');
    fireEvent.click(button);
    fireEvent.click(updateButton);
    expect(component).toMatchSnapshot();
  });
});
