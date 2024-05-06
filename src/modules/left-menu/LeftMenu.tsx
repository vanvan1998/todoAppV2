'use client';

import React from 'react';
import { PrivateLayout } from '../../components/PrivateLayout';
import { LeftMenuView } from './LeftMenuView';

export const LeftMenu = () => {
  return (
    <PrivateLayout>
      <LeftMenuView />
    </PrivateLayout>
  );
};
