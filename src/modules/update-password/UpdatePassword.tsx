'use client';
import React from 'react';
import { PrivateLayout } from '../../components/PrivateLayout';
import { UpdatePasswordView } from './UpdatePasswordView';

export const UpdatePassword = () => {
  return (
    <PrivateLayout>
      <UpdatePasswordView />
    </PrivateLayout>
  );
};
