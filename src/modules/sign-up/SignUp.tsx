'use client';

import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Layout } from '../components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { signUp } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signUp(email, password);
      router.push('/');
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  };

  return (
    <Layout>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
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
            <Form.Group id='password-confirm' className='mt-2'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type='password'
                value={passwordConfirm}
                onChange={e => {
                  setPasswordConfirm(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-4' type='submit'>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link href='/sign-in'>Log In</Link>
      </div>
    </Layout>
  );
};
