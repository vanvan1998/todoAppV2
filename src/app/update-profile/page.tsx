import React from 'react';
import { UpdateProfile } from 'src/modules';
import { PrivateLayout } from '../layout';

export default function Page() {
  return (
    <PrivateLayout>
      <UpdateProfile />
    </PrivateLayout>
  );
}
