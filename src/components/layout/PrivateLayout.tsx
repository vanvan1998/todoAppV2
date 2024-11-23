'use client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from 'src/contexts';
import { Header } from '../header';
import { Layout } from './Layout';
import styled from 'styled-components';
import { styles } from './Layout.styles';

const Container = styled.div`
  ${styles.container}
`;

export const PrivateLayout = ({ children, isPrivate = true }: { children: React.ReactNode; isPrivate?: boolean }) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isPrivate && !currentUser) {
      router.push('/sign-in');
    }
  }, []);

  return (
    <Layout>
      <Header />
      <Container className='justify-content-center'>{children}</Container>
    </Layout>
  );
};
