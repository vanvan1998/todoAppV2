/* eslint-disable @typescript-eslint/no-empty-function */
'use client';

import React, { useContext, useState, useEffect, createContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateEmail,
  updateProfile,
  updatePassword,
  signInWithPopup
} from 'firebase/auth';
import { auth, provider } from 'src/firebase';

export type AuthContextProps = {
  currentUser: any;
  signIn: (email: any, password: any) => void;
  signUp: (email: any, password: any) => void;
  logout: () => void;
  signInWithGoogle: () => void;
  resetPassword: (email: any) => void;
  updateEmail: (email: any) => void;
  updatePassword: (password: any) => void;
  updateProfile: ({ name, photo }: any) => void;
};

const AuthContext = createContext<AuthContextProps>({
  currentUser: {},
  signIn: () => {},
  signUp: () => {},
  logout: () => {},
  resetPassword: () => {},
  updateEmail: () => {},
  updatePassword: () => {},
  signInWithGoogle: () => {},
  updateProfile: () => {}
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = () => signInWithPopup(auth, provider);

  const signUp = (email: any, password: any) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: any, password: any) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email: any) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserEmail = (email: any) => {
    return updateEmail(currentUser, email);
  };

  const updateUserProfile = ({ name, photoURL }: { name?: string; photoURL?: string }) => {
    return updateProfile(currentUser, {
      displayName: name,
      photoURL
    });
  };

  const updateUserPassword = (password: any) => {
    return updatePassword(currentUser, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signIn,
    signUp,
    logout,
    resetPassword,
    updateEmail: updateUserEmail,
    updatePassword: updateUserPassword,
    updateProfile: updateUserProfile,
    signInWithGoogle: signInWithGoogle
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
