import React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'

import { GlobalStyle } from '../src/utils/GlobalStyle'

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
  cache: new InMemoryCache(),
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    window.Kakao.init(process.env.NEXT_PUBLIC_JAVASCRIPT_KEY)
    window.Kakao.isInitialized()
  }, [])

  return (
    <ApolloProvider client={client}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GlobalStyle />
<<<<<<< HEAD
=======
      <Component {...pageProps} />
>>>>>>> 6fd9a2edc11aed57808395e7f9edf0b527ce4fe8
    </ApolloProvider>
  )
}

export default MyApp
