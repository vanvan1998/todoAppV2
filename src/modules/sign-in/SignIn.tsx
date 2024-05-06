'use client';

import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Layout } from '../../components/Layout';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  if (currentUser) router.push('/');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await signIn(email, password);
      router.push('/');
    } catch {
      setError('Failed to log in');
    }

    setLoading(false);
  };

  return (
    <Layout>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
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
                required
              />
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-4' type='submit'>
              Log In
            </Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link href='/forgot-password'>Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link href='/sign-up'>Sign Up</Link>
      </div>
    </Layout>
  );
};
