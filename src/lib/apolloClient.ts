import { GetServerSidePropsContext } from 'next'
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client'
import cookies from 'next-cookies'
import { setContext } from '@apollo/client/link/context'

function createApolloClient(
  ctx: GetServerSidePropsContext
): ApolloClient<NormalizedCacheObject> {
  let headers = {}
  let accessToken = ''
  if (ctx) {
    accessToken = cookies(ctx).token ?? ''
    if (accessToken) {
      headers = {
        Authorization: accessToken,
      }
    }
  }

  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
  })

  const authLink = setContext((__, { headers }) => {
    return {
      headers: {
        ...headers,
        // authorization: token ? `Bearer ${token}` : '',
        'account-id': '2',
      },
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
    credentials: 'includes',
    headers: headers,
  })
  return client
}

export default createApolloClient
