'use client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from '../contexts/AuthContext';
import { GoogleAnalytics } from '@next/third-parties/google';
// export const metadata: Metadata = {
//   title: 'React App',
//   description: 'Web site created with Next.js.'
// };

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <AuthProvider>{children}</AuthProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ''} />
      </body>
    </html>
  );
};

export default RootLayout;
