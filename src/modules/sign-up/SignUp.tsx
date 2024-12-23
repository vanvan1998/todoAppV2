'use client';

import React, { useState } from 'react';
import { useAuth } from 'src/contexts';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Layout } from '../../components';
import styled from 'styled-components';
import { styles } from './SignUp.styles';
import { ErrorText, HeaderTitle, PlaceholderTitle, Button, Input } from 'src/components';
import { useMediaQuery } from 'src/hooks';
import { isEmpty } from 'lodash';

const Container = styled.div<{ isMobile: boolean }>`
  ${styles.container}
`;

const LinkWrapper = styled.div`
  ${styles.linkWrapper}
`;

const ErrorWrapper = styled.div<{ isMobile: boolean }>`
  ${styles.errorWrapper}
`;

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { signUp } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isMobile } = useMediaQuery();

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
      <Container isMobile={isMobile}>
        <HeaderTitle>Sign Up</HeaderTitle>
        <PlaceholderTitle>Please enter your details to sign up</PlaceholderTitle>
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
        <Input
          title='Confirm Password'
          value={passwordConfirm}
          onChange={setPasswordConfirm}
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
          disabled={loading || isEmpty(email) || isEmpty(password) || isEmpty(passwordConfirm)}
          type='submit'
          title='Sign up'
          handleButton={handleSubmit}
          styles={{
            marginTop: 32,
            marginBottom: 16,
            ...(isMobile ? { maxWidth: 320, minWidth: 200, width: '80vw' } : { width: 320 })
          }}
        />
        <LinkWrapper>
          Already have an account? <Link href='/sign-in'>Sign In</Link>
        </LinkWrapper>
      </Container>
    </Layout>
  );
};
