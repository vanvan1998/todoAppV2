import React, { createContext } from 'react';
import { render } from '@testing-library/react';
import { AuthContextProps, AuthProvider, useAuth } from '../AuthContext';

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

jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');
  return {
    ...originalModule,
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
    onAuthStateChanged: (_auth: any, callback: () => void) => {
      callback();
    },
    updateEmail: jest.fn(),
    updateProfile: jest.fn(),
    updatePassword: jest.fn(),
    signInWithPopup: jest.fn()
  };
});

describe('AuthContext', () => {
  it('renders AuthProvider with desktop view', () => {
    const TestComponent = () => {
      const {
        currentUser,
        updateEmail,
        updatePassword,
        updateProfile,
        signIn,
        signUp,
        logout,
        signInWithGoogle,
        resetPassword
      } = useAuth();
      signUp('email@gmail.com', 'password');
      signIn('email@gmail.com', 'password');
      updateEmail('email@gmail.com');
      updateEmail('email@gmail.com');
      updatePassword('password');
      updateProfile({ name: 'name' });
      resetPassword('email@gmail.com');
      logout();
      signInWithGoogle();

      return (
        <div>
          <div>User: {currentUser ? currentUser.name : 'No user'}</div>
        </div>
      );
    };
    const component = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(component).toMatchSnapshot();
  });
});
