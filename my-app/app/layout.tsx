import "./globals.css";
import Header from "./component/header";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const viewport = {
  initialScale: 1,
  width: "device-width",
}

export const metadata = {
  title: "Travel planner",
  description: "A travel planning website",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <Header />
          <main>
            {children}
          </main>      
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
