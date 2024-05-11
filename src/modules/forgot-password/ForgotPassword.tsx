'use client';

import React, { useState } from 'react';
import { useAuth } from 'src/contexts/AuthContext';
import Link from 'next/link';
import { Layout } from '../../components';
import styled from 'styled-components';
import { styles } from './ForgotPassword.styles';
import { SuccessText, ErrorText, Header, PlaceholderTitle } from 'src/theme';
import { Button, Input } from 'src/components';
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

const SubHeader = styled.div`
  ${styles.subHeader}
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
      <Container isMobile={isMobile}>
        <Header>Password Reset</Header>
        <SubHeader>
          <PlaceholderTitle>
            Enter your email and we will send you information on how to reset your password
          </PlaceholderTitle>
        </SubHeader>
        <Input
          title='Email'
          value={email}
          onChange={setEmail}
          styles={{ marginBottom: 16, marginTop: 60 }}
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
          disabled={loading || isEmpty(email)}
          type='submit'
          title='Reset password'
          handleButton={handleSubmit}
          styles={{
            marginTop: 24,
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
