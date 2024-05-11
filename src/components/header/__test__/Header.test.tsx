import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '..';

jest.mock('src/hooks', () => {
  const originalModule = jest.requireActual('src/hooks');
  return {
    ...originalModule,
    useMediaQuery: jest.fn().mockReturnValue({
      isMobile: true
    })
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

describe('Test Header component', () => {
  test.only('should match its snapshot', async () => {
    const component = render(<Header />);

    const button = component.getByTestId('account-button');
    fireEvent.click(button);
    expect(component).toMatchSnapshot();
  });
});
