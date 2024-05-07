'use client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { backgroundColor } from 'src/theme';
// export const metadata: Metadata = {
//   title: 'React App',
//   description: 'Web site created with Next.js.'
// };

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: backgroundColor,
        alignItems: 'center'
      }}
    >
      {children}
    </div>
  );
};
