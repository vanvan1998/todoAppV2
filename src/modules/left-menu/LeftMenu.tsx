'use client';

import React, { useState } from 'react';
import { Card, Button, Alert, Image } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const LeftMenu = () => {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    setError('');

    try {
      await logout();
      router.push('/sign-in');
    } catch {
      setError('Failed to log out');
    }
  };

  return (
    <div className='w-100' style={{ maxWidth: '400px' }}>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <div className='mb-4 text-center'>
            {currentUser.photoURL && <Image src={currentUser.photoURL} alt='uploaded file' height={300} />}
          </div>
          <div className='mb-2'>
            <strong>Name:</strong> {currentUser.displayName}
          </div>
          <strong>Email:</strong> {currentUser.email}
          <Link href='/update-profile' className='btn btn-primary w-100 mt-3'>
            Update Profile
          </Link>
          <Link href='/update-password' className='btn btn-primary w-100 mt-3'>
            Update Password
          </Link>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button variant='link' onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );
};
