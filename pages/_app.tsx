import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import ReactGA from 'react-ga'

import { ApolloProvider } from '@apollo/client'

import NextHead from '../src/components/NextHead'
import { GlobalStyle } from '../src/utils/GlobalStyle'
import { useApollo } from '../src/lib/apollo'
import 'simplebar/src/simplebar.css'
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
      <NextHead />
      <GlobalStyle />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
