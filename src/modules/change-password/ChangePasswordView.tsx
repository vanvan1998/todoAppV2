'use client';

import React, { useState } from 'react';
import { useAuth } from 'src/contexts';
import styled from 'styled-components';
import { styles } from './ChangePassword.styles';
import { placeholderColor } from 'src/theme';
import { ErrorText, HeaderTitle, PlaceholderTitle, SuccessText, Title, Button, Input } from 'src/components';
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
  if (!currentUser) {
    return <></>;
  }
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
            <HeaderTitle style={{ fontWeight: '600' }}>Change password</HeaderTitle>
            <PlaceholderTitle>Please enter your new password to change</PlaceholderTitle>
          </TitleWrapper>
          <Title>
            You are login as{' '}
            <Title style={{ fontWeight: 'bold', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
              {currentUser.email}
            </Title>
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
            border: `1px solid ${placeholderColor}`,
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
            border: `1px solid ${placeholderColor}`,
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
          testId='change-password-button'
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
