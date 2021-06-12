import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import ReactGA from 'react-ga'

import { ApolloProvider } from '@apollo/client'

import { GlobalStyle } from '../src/utils/GlobalStyle'
import { useApollo } from '../src/lib/apollo'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState)
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

    const env = process.env.NODE_ENV

    if (env === 'production') {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GA_TRACK_ID ?? '')
    }
  }, [])

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
