import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { HomeIcon } from '../icons';
import { AccountIcon } from '../icons/AccountIcon';

export const Header = () => {
  const { currentUser } = useAuth();

  return (
    <div
      style={{
        height: 70,
        backgroundColor: 'black',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '16px 16px'
      }}
    >
      <Link href='/' className=''>
        <HomeIcon fill='white' />
      </Link>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{
            color: 'white',
            paddingRight: 10,
            display: 'flex',
            alignItems: 'center',
            fontSize: 18
          }}
        >
          Hi {currentUser.displayName}
        </div>
        <Link href='/left-menu' className=''>
          <AccountIcon fill='white' />
        </Link>
      </div>
    </div>
  );
};
