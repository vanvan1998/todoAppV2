'use client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from '../contexts/AuthContext';
// export const metadata: Metadata = {
//   title: 'React App',
//   description: 'Web site created with Next.js.'
// };

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <title>Todo app</title>
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
