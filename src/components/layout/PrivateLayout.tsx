'use client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Header } from '../Header';
import { Layout } from './Layout';
import styled from 'styled-components';
import { styles } from './Layout.styles';

const Container = styled.div`
  ${styles.container}
`;

export const PrivateLayout = ({ children }: any) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/sign-in');
    }
  }, []);

  return currentUser ? (
    <Layout>
      <Header />
      <Container className='align-items-center justify-content-center'>{children}</Container>
    </Layout>
  ) : (
    <></>
  );
};
