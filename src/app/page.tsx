import React from 'react';
import { DashBoard } from 'src/modules';
import { PrivateLayout } from './layout';

const Page = () => {
  return (
    <PrivateLayout>
      <DashBoard />
    </PrivateLayout>
  );
};

export default Page;
