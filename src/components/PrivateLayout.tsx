'use client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Header } from './Header';
import { Layout } from './Layout';
// export const metadata: Metadata = {
//   title: 'React App',
//   description: 'Web site created with Next.js.'
// };

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
      <div
        className='align-items-center justify-content-center'
        style={{ display: 'flex', height: '100%', backgroundColor: '#f0f0f0', flex: 1 }}
      >
        {children}
      </div>
    </Layout>
  ) : (
    <></>
  );
};
