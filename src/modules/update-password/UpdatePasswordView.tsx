'use client';

import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const UpdatePasswordView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }

    const promises = [];
    setLoading(true);
    setError('');

    if (email !== currentUser.email) {
      promises.push(updateEmail(email) as never);
    }
    if (password) {
      promises.push(updatePassword(password) as never);
    }

    Promise.all(promises)
      .then(() => {
        router.push('/');
      })
      .catch(() => {
        setError('Failed to update account');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='w-100' style={{ maxWidth: '400px' }}>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Update Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id='password' className='mt-2'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
                placeholder='Leave blank to keep the same'
              />
            </Form.Group>
            <Form.Group id='password-confirm' className='mt-2'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type='password'
                value={passwordConfirm}
                onChange={e => {
                  setPasswordConfirm(e.target.value);
                }}
                placeholder='Leave blank to keep the same'
              />
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-4' type='submit'>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link href='/left-menu'>Cancel</Link>
      </div>
    </div>
  );
};
