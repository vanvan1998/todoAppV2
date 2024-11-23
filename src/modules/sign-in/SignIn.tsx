'use client';

import React, { useState } from 'react';
import { useAuth } from 'src/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Layout } from '../../components';
import styled from 'styled-components';
import { styles } from './SignIn.styles';
import { ErrorText, HeaderTitle, PlaceholderTitle, Button, Input } from 'src/components';
import { useMediaQuery } from 'src/hooks';
import { isEmpty } from 'lodash';
import { GoogleIcon } from 'src/icons';

const Container = styled.div<{ isMobile: boolean }>`
  ${styles.container}
`;

const LinkWrapper = styled.div`
  ${styles.linkWrapper}
`;

const ErrorWrapper = styled.div<{ isMobile: boolean }>`
  ${styles.errorWrapper}
`;

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, currentUser, signInWithGoogle } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  if (currentUser) router.push('/');
  const { isMobile } = useMediaQuery();

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
      <Container isMobile={isMobile}>
        <HeaderTitle>Welcome Back</HeaderTitle>
        <PlaceholderTitle>Please enter your details to sign in</PlaceholderTitle>
        <Input
          title='Email'
          value={email}
          onChange={setEmail}
          styles={{ marginBottom: 16, marginTop: 32 }}
          placeholder='Enter your email...'
          inputStyles={isMobile ? { maxWidth: 320, minWidth: 200, width: '80vw' } : { minHeight: 48, minWidth: 320 }}
        />
        <Input
          title='Password'
          value={password}
          onChange={setPassword}
          styles={{ marginBottom: 12 }}
          inputType='password'
          placeholder='Enter your password...'
          inputStyles={isMobile ? { maxWidth: 320, minWidth: 200, width: '80vw' } : { minHeight: 48, minWidth: 320 }}
        />
        {error && (
          <ErrorWrapper isMobile={isMobile}>
            <ErrorText>{error}</ErrorText>
          </ErrorWrapper>
        )}
        <Button
          disabled={loading || isEmpty(email) || isEmpty(password)}
          type='submit'
          title='Sign in'
          handleButton={handleSubmit}
          styles={{
            marginTop: 32,
            marginBottom: 16,
            ...(isMobile ? { maxWidth: 320, minWidth: 200, width: '80vw' } : { width: 320 })
          }}
        />
        <Button
          buttonType='secondary'
          title='Sign in with google'
          handleButton={signInWithGoogle}
          styles={{
            marginTop: 32,
            marginBottom: 16,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            gap: 8,
            ...(isMobile ? { maxWidth: 320, minWidth: 200, width: '80vw' } : { width: 320 })
          }}
        >
          <GoogleIcon width={18} />
        </Button>
        <LinkWrapper>
          <Link href='/forgot-password'>Forgot Password?</Link>
        </LinkWrapper>
        <LinkWrapper>
          Don&apos;t have an account? <Link href='/sign-up'>Sign Up</Link>
        </LinkWrapper>
      </Container>
    </Layout>
  );
};
