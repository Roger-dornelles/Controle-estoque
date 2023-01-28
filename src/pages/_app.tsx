import { Sidebar } from '@/components/sidebar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { SnackbarProvider } from '@/context/SnackbarContext';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <SnackbarProvider>
          {session && (
            <Sidebar>
              <Component {...pageProps} />
            </Sidebar>
          )}
        </SnackbarProvider>
      </SessionProvider>
      {!session && (
        <SnackbarProvider>
          <Component {...pageProps} />
        </SnackbarProvider>
      )}
    </>
  );
}
