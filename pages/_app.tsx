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
<<<<<<< HEAD
      <GlobalStyle></GlobalStyle>
=======
      <GlobalStyle />
>>>>>>> 7de855e8be6d24f69665c130c5583767ee77c76d
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
