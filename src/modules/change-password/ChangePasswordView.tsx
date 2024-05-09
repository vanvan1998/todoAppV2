'use client';

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';
import { styles } from './ChangePassword.styles';
import { ErrorText, Header, PlaceholderTitle, SuccessText, Title, placeholder } from 'src/theme';
import { Button, Input } from 'src/components';
import { useMediaQuery } from 'src/hooks';
import { isEmpty } from 'lodash';

const Container = styled.div<{ isMobile: boolean }>`
  ${styles.container}
`;

const HeaderWrapper = styled.div<{ isMobile: boolean }>`
  ${styles.headerWrapper}
`;

const TitleWrapper = styled.div`
  ${styles.titleWrapper}
`;

const ErrorWrapper = styled.div<{ isMobile: boolean }>`
  ${styles.errorWrapper}
`;

export const ChangePasswordView = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { currentUser, updatePassword } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { isMobile } = useMediaQuery();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }

    const promises = [];
    setLoading(true);
    setError('');
    setSuccess('');
    if (password) {
      promises.push(updatePassword(password) as never);
    }

    Promise.all(promises)
      .then(() => {
        setSuccess('Password updated successfully');
      })
      .catch(() => {
        setError('Failed to update account');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Container isMobile={isMobile}>
        <HeaderWrapper isMobile={isMobile}>
          <TitleWrapper>
            <Header style={{ fontWeight: '600' }}>Change password</Header>
            <PlaceholderTitle>Please enter your new password to change</PlaceholderTitle>
          </TitleWrapper>
          <Title>
            You are login as <Title style={{ fontWeight: 'bold' }}>{currentUser.email}</Title>
          </Title>
        </HeaderWrapper>
        <Input
          title='New password'
          value={password}
          onChange={setPassword}
          styles={{ marginBottom: 12, marginTop: 40 }}
          inputType='password'
          placeholder='Enter your password...'
          inputStyles={{
            ...(isMobile ? { maxWidth: 320, minWidth: 200, width: '80vw' } : { minHeight: 48, minWidth: 320 }),
            border: `1px solid ${placeholder}`,
            backgroundColor: '#fefeff'
          }}
        />
        <Input
          title='Confirm new password'
          value={passwordConfirm}
          onChange={setPasswordConfirm}
          styles={{ marginBottom: 12 }}
          inputType='password'
          placeholder='Enter your password...'
          inputStyles={{
            ...(isMobile ? { maxWidth: 320, minWidth: 200, width: '80vw' } : { minHeight: 48, minWidth: 320 }),
            border: `1px solid ${placeholder}`,
            backgroundColor: '#fefeff'
          }}
        />
        {success && (
          <ErrorWrapper isMobile={isMobile}>
            <SuccessText>{success}</SuccessText>
          </ErrorWrapper>
        )}
        {error && (
          <ErrorWrapper isMobile={isMobile}>
            <ErrorText>{error}</ErrorText>
          </ErrorWrapper>
        )}
        <Button
          disabled={loading || isEmpty(passwordConfirm) || isEmpty(password)}
          type='submit'
          title='Change Password'
          handleButton={handleSubmit}
          styles={{
            marginTop: 32,
            marginBottom: 16,
            ...(isMobile ? { maxWidth: 320, minWidth: 200, width: '80vw' } : { width: 320 })
          }}
        />
      </Container>
    </>
  );
};
