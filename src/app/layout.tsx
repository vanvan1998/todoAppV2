'use client';
import type { Metadata } from 'next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { Header } from 'src/modules/components';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// export const metadata: Metadata = {
//   title: 'React App',
//   description: 'Web site created with Next.js.'
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <div
            className='align-items-center justify-content-center'
            style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                maxWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center'
              }}
              className='col-md-6 col-sm-10 col-10'>
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

export const PrivateRoute = ({ children }: any) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, []);

  return (
    currentUser && (
      <RootLayout>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Header />
          <div
            className='align-items-center justify-content-center'
            style={{ display: 'flex', height: '100%', backgroundColor: '#f0f0f0' }}>
            {children}
          </div>
        </div>
      </RootLayout>
    )
  );
};
