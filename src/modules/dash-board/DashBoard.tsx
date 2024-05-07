'use client';
import React from 'react';
import { PrivateLayout } from '../../components/PrivateLayout';
import { DashBoardView } from './DashBoardView';

export const DashBoard = () => {
  return (
    <PrivateLayout>
      <DashBoardView />
    </PrivateLayout>
  );
};
