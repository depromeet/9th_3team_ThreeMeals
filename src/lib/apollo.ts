import { GetServerSidePropsContext } from 'next'
import { useMemo } from 'react'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import _isEmpty from 'lodash-es/isEmpty'

import createApolloClient from './apolloClient'

type initialStateType = { [key: string]: any }

let apolloClient: ApolloClient<NormalizedCacheObject>

export function initializeApollo(
  initialState: initialStateType = {},
  ctx: GetServerSidePropsContext
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient(ctx)

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (!_isEmpty(initialState)) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient
  return _apolloClient
}

export function useApollo(
  initialState: initialStateType,
  ctx: GetServerSidePropsContext
): ApolloClient<NormalizedCacheObject> {
  const store = useMemo(() => initializeApollo(initialState, ctx), [
    initialState,
    ctx,
  ])
  return store
}
