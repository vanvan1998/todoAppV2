'use client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { AppProvider } from 'src/contexts';
// export const metadata: Metadata = {
//   title: 'React App',
//   description: 'Web site created with Next.js.'
// };

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <AppProvider>{children}</AppProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ''} />
      </body>
    </html>
  );
};

export default RootLayout;
