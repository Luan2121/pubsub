import '../styles/globals.css';
import 'keen-slider/keen-slider.min.css';
import type { AppProps } from 'next/app';
import { useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { queryClientOptions } from '../src/utils/query-client';
import { AppGlobalStyles } from '../src/components/global-styles';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = useRef<QueryClient>();
  const { dehydratedState } = pageProps;
  if(!queryClient.current){
    queryClient.current = new QueryClient(queryClientOptions);
  }
  return (
    <QueryClientProvider client = {queryClient.current}>
      <Hydrate state = {dehydratedState}>
        <AppGlobalStyles />
        <Component {...pageProps} />
        <Toaster />
      </Hydrate>
    </QueryClientProvider>
  );
}
export default MyApp
