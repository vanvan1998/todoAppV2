import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { ChangePasswordView } from '../ChangePasswordView';
import { useAuth } from 'src/contexts';

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
      .mockReturnValueOnce({ isMobile: false })
  };
});

jest.mock('src/contexts', () => {
  return {
    useAuth: jest
      .fn()
      .mockReturnValue({ currentUser: { displayName: 'displayName', email: 'email' }, updatePassword: jest.fn() })
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
    const input2 = screen.getByLabelText('New password');
    fireEvent.change(input2, { target: { value: '123' } });
    const input3 = screen.getByLabelText('Confirm new password');
    fireEvent.change(input3, { target: { value: '123' } });

    const button = component.getByTestId('change-password-button');
    fireEvent.click(button);
    expect(component).toMatchSnapshot();
  });

  it('renders ChangePasswordView with desktop view', () => {
    const component = render(<ChangePasswordView />);
    const input2 = screen.getByLabelText('New password');
    fireEvent.change(input2, { target: { value: '123' } });
    const input3 = screen.getByLabelText('Confirm new password');
    fireEvent.change(input3, { target: { value: '12345' } });

    const button = component.getByTestId('change-password-button');
    fireEvent.click(button);
    expect(component).toMatchSnapshot();
  });

  it('renders ChangePasswordView with mobile view', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useAuth.mockImplementation(
      jest.fn(() => ({
        currentUser: { displayName: 'displayName', email: 'email' },
        updatePassword: jest.fn().mockRejectedValue('error')
      }))
    );
    const component = render(<ChangePasswordView />);
    const input2 = screen.getByLabelText('New password');
    fireEvent.change(input2, { target: { value: '123' } });
    const input3 = screen.getByLabelText('Confirm new password');
    fireEvent.change(input3, { target: { value: '123' } });

    const button = component.getByTestId('change-password-button');
    fireEvent.click(button);
    expect(component).toMatchSnapshot();
  });
});
