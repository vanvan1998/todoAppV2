'use client';
import React from 'react';
import { PrivateLayout } from '../../components/PrivateLayout';
import { DashBoardView } from './DashBoardVIew';

export const DashBoard = () => {
  return (
    <PrivateLayout>
      <DashBoardView />
    </PrivateLayout>
  );
};
