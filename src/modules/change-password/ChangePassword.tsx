'use client';
import React from 'react';
import { PrivateLayout } from '../../components';
import { ChangePasswordView } from './ChangePasswordView';

export const ChangePassword = () => {
  return (
    <PrivateLayout>
      <ChangePasswordView />
    </PrivateLayout>
  );
};
