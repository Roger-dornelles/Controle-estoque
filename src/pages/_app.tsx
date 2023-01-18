import { Sidebar } from '@/components/sidebar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Login from './index';

const token = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {token && (
        <Sidebar>
          <Component {...pageProps} />
        </Sidebar>
      )}
      <Login />
    </>
  );
}
