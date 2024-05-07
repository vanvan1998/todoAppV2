'use client';

import React, { useState } from 'react';
import { Form, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import { Layout } from '../../components/Layout';
import styled from 'styled-components';
import { styles } from './ForgotPassword.styles';
import { SuccessText, ErrorText, Header, PlaceholderTitle } from 'src/theme';
import { Button, Input } from 'src/components';
import { useMediaQuery } from 'src/hooks';

const Container = styled.div<{ isMobile: boolean }>`
  ${styles.container}
`;

const LinkWrapper = styled.div`
  ${styles.linkWrapper}
`;

const ErrorWrapper = styled.div<{ isMobile: boolean }>`
  ${styles.errorWrapper}
`;

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { isMobile } = useMediaQuery();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
    }

    setLoading(false);
  };

  return (
    <Layout>
      {/* <Container>
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Password Reset</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            {message && <Alert variant='success'>{message}</Alert>}
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
              <Button disabled={loading} className='w-100 mt-4' type='submit'>
                Reset Password
              </Button>
            </Form>
            <div className='w-100 text-center mt-3'>
              <Link href='/sign-in'>Sign In</Link>
            </div>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-4'>
          Need an account? <Link href='/sign-up'>Sign Up</Link>
        </div>
      </Container> */}

      <Container isMobile={isMobile}>
        <Header>Welcome back</Header>
        <PlaceholderTitle>Please enter your details to sign in</PlaceholderTitle>
        <Input
          title='Email'
          value={email}
          onChange={setEmail}
          styles={{ marginBottom: 16, marginTop: 32 }}
          placeholder='Enter your email...'
          inputStyles={isMobile ? { maxWidth: 320, minWidth: 200, width: '80vw' } : { minHeight: 48, minWidth: 320 }}
        />
        {error && (
          <ErrorWrapper isMobile={isMobile}>
            <ErrorText>{error}</ErrorText>
          </ErrorWrapper>
        )}
        {message && (
          <ErrorWrapper isMobile={isMobile}>
            <SuccessText>{message}</SuccessText>
          </ErrorWrapper>
        )}

        <Button
          disabled={loading}
          type='submit'
          title='Reset Password'
          handleButton={handleSubmit}
          styles={{
            marginTop: 32,
            marginBottom: 16,
            ...(isMobile ? { maxWidth: 320, minWidth: 200, width: '80vw' } : { width: 320 })
          }}
        />
        <LinkWrapper>
          <Link href='/sign-in'>Sign In</Link>
        </LinkWrapper>
        <LinkWrapper>
          Don&apos;t have an account? <Link href='/sign-up'>Sign Up</Link>
        </LinkWrapper>
      </Container>
    </Layout>
  );
};
