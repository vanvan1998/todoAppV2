import React from 'react';
import { UpdatePassword } from 'src/modules';
import { PrivateLayout } from '../layout';

export default function Page() {
  return (
    <PrivateLayout>
      <UpdatePassword />
    </PrivateLayout>
  );
}
