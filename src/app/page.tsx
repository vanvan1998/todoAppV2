import React from 'react';
import { DashBoard } from 'src/modules';
import { PrivateLayout } from './layout';

export default function Page() {
  return (
    <PrivateLayout>
      <DashBoard />
    </PrivateLayout>
  );
}
