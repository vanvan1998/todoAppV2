'use client';
import React from 'react';
import { PrivateLayout } from '../../components';
import { UpdatePasswordView } from './UpdatePasswordView';

export const UpdatePassword = () => {
  return (
    <PrivateLayout>
      <UpdatePasswordView />
    </PrivateLayout>
  );
};
