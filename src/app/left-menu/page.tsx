import React from 'react';
import { LeftMenu } from 'src/modules';
import { PrivateLayout } from '../layout';

export default function Page() {
  return (
    <PrivateLayout>
      <LeftMenu />
    </PrivateLayout>
  );
}
