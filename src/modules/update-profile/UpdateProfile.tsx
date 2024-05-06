'use client';

import React from 'react';
import { PrivateLayout } from '../../components/PrivateLayout';
import { UpdateProfileView } from './UpdateProfileView';

export const UpdateProfile = () => {
  return (
    <PrivateLayout>
      <UpdateProfileView />
    </PrivateLayout>
  );
};
