import '@coinbase/onchainkit/styles.css';
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { HelpProvider } from '@/contexts/HelpContext';
import { NotificationProvider } from '@/contexts/NotificationContext';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
  description: 'Generated by `create-onchain`, a Next.js template for OnchainKit',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-background">
        <NotificationProvider>
        <HelpProvider>
            <Providers>{children}</Providers>
          </HelpProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
