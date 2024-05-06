import React from 'react';
import { UpdateProfile } from 'src/modules';
import { PrivateLayout } from '../layout';

const Page = () => {
  return (
    <PrivateLayout>
      <UpdateProfile />
    </PrivateLayout>
  );
};

export default Page;
