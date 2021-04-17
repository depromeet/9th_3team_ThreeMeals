import React from 'react';
import type { AppProps } from 'next/app';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://countries-274616.ew.r.appspot.com',
  cache: new InMemoryCache(),
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    window.Kakao.init(process.env.NEXT_PUBLIC_JAVASCRIPT_KEY);
    window.Kakao.isInitialized();
  }, []);

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
