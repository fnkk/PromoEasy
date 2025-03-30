// RootLayout.tsx
import '@rainbow-me/rainbowkit/styles.css';
import "./globals.css";
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import localFont from 'next/font/local';

const DynamicComponent = dynamic(() => import('./DynamicComponent'), { ssr: false });

interface RootLayoutProps {
  children: ReactNode;
}

const myFont = localFont({
  src: './Arial-Grotesk-Regular.otf',
  display: 'swap',
});

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" className={`dark ${myFont.className}`}>
      <link rel="icon" href="/favicon2.ico" type="image/x-icon" sizes="255x222" />
      <head>
      </head>
      <body>
        <DynamicComponent>{children}</DynamicComponent>
      </body>
    </html>
  );
}