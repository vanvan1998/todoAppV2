'use client';

import React, { useRef, useState } from 'react';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { Form, Image } from 'react-bootstrap';
import { useAuth } from 'src/contexts/AuthContext';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { styles } from './UpdateProfileView.styles';
import { ErrorText, HeaderTitle, SuccessText, Title, Button, Input } from 'src/components';
import { placeholderColor } from 'src/theme';
import { useMediaQuery } from 'src/hooks';

const Container = styled.div`
  ${styles.Container}
`;

const HeaderWrapper = styled.div<{ isMobile: boolean }>`
  ${styles.headerWrapper}
`;

const ErrorWrapper = styled.div<{ isMobile: boolean }>`
  ${styles.errorWrapper}
`;

export const UpdateProfileView = () => {
  const { currentUser, updateProfile } = useAuth();
  const [name, setName] = useState(currentUser?.displayName);
  const [imgUrl, setImgUrl] = useState(currentUser?.photoURL);
  const [error, setError] = useState('');
  const [errorName, setErrorName] = useState('');
  const [success, setSuccess] = useState('');
  const [successName, setSuccessName] = useState('');
  const [loading, setLoading] = useState(false);
  const { isMobile } = useMediaQuery();
  const selectedFileRef = useRef();
  if (!currentUser) return <></>;

  const onFileChange = e => {
    selectedFileRef.current = e.target.files[0];
  };

  const handleSubmitImage = (e: any) => {
    e.preventDefault();

    if (!selectedFileRef.current) return;

    const promises: any[] = [];
    const storageRef = ref(storage, `files/${(selectedFileRef.current as any).name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFileRef.current);

    uploadTask.on(
      'state_changed',
      () => {
        // const progress = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // );
      },
      error => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setImgUrl(downloadURL);
          promises.push(updateProfile({ photoURL: downloadURL }));
        });
      }
    );

    Promise.all(promises)
      .then(() => {
        setSuccess('Update Avatar successfully');
      })
      .catch(() => {
        setError('Failed to update account');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const promises = [];
    setLoading(true);
    setErrorName('');
    setSuccessName('');

    if (name) {
      promises.push(updateProfile({ name }) as never);
    }

    Promise.all(promises)
      .then(() => {
        setSuccessName('Full name updated successfully');
      })
      .catch(() => {
        setErrorName('Failed to update account');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <HeaderWrapper isMobile={isMobile}>
        <HeaderTitle style={{ fontWeight: '600' }}>Profile</HeaderTitle>
        <Title>
          You&apos;re logged in as <Title style={{ fontWeight: 'bold' }}>{currentUser.email}</Title>
        </Title>
      </HeaderWrapper>

      <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Form.Group id='file'>
          <div className='mb-4 text-center'>{imgUrl && <Image src={imgUrl} alt='uploaded file' height={300} />}</div>
          <Title style={{ padding: '8px 0' }}>Avatar</Title>
          <Form.Control type='file' onChange={onFileChange} />
        </Form.Group>

        {error && (
          <ErrorWrapper isMobile={isMobile}>
            <ErrorText>{error}</ErrorText>
          </ErrorWrapper>
        )}
        {success && (
          <ErrorWrapper isMobile={isMobile}>
            <SuccessText>{success}</SuccessText>
          </ErrorWrapper>
        )}
        <Button
          disabled={loading}
          title='Update Avatar'
          handleButton={handleSubmitImage}
          styles={{
            marginTop: 8,
            marginBottom: 16,
            ...(isMobile ? { maxWidth: 320, minWidth: 200, width: '80vw' } : { width: 320 })
          }}
          testId='update-avatar-button'
        />
      </Form>
      <Input
        title='Full name'
        value={name}
        onChange={setName}
        styles={{ marginBottom: 8, marginTop: 32 }}
        placeholder='Enter your full name...'
        inputStyles={{
          ...(isMobile ? { maxWidth: 320, minWidth: 200, width: '80vw' } : { minHeight: 48, minWidth: 320 }),
          border: `1px solid ${placeholderColor}`,
          backgroundColor: '#fefeff'
        }}
      />
      {errorName && (
        <ErrorWrapper isMobile={isMobile}>
          <ErrorText>{errorName}</ErrorText>
        </ErrorWrapper>
      )}
      {successName && (
        <ErrorWrapper isMobile={isMobile}>
          <SuccessText>{successName}</SuccessText>
        </ErrorWrapper>
      )}
      <Button
        disabled={loading || isEmpty(name)}
        title='Update'
        handleButton={handleSubmit}
        styles={{
          marginTop: 8,
          marginBottom: 16,
          ...(isMobile ? { maxWidth: 320, minWidth: 200, width: '80vw' } : { width: 320 })
        }}
        testId='update-button'
      />
    </Container>
  );
};
