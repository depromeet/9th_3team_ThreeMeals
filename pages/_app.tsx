import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { GlobalStyle } from '../src/utils/GlobalStyle'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'same-origin',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('kakao_token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',

      'account-id': '1',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const id = 'kakao-sdk'
    if (document.getElementById(id) == null) {
      const js = document.createElement('script')

      js.id = id
      js.src = 'https://developers.kakao.com/sdk/js/kakao.js'
      js.onload = () => {
        window.Kakao.init(process.env.NEXT_PUBLIC_JAVASCRIPT_KEY)
        window.Kakao.isInitialized()
      }

      document.body.append(js)
    }
  }, [])

  return (
    <ApolloProvider client={client}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
