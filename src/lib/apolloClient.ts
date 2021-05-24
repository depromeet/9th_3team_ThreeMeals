import { GetServerSidePropsContext } from 'next'
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client'
import cookies from 'next-cookies'
import jsCookies from 'js-cookie'
import { setContext } from '@apollo/client/link/context'

function createApolloClient(
  ctx?: GetServerSidePropsContext
): ApolloClient<NormalizedCacheObject> {
  let headers = {}
  let accessToken = ''
  if (ctx) {
    // 서버 사이드
    accessToken = cookies(ctx).token ?? ''
    if (accessToken) {
      headers = {
        authorization: accessToken,
      }
    }
  } else {
    // 클라이언트에서는 브라우저 쿠키를 참조
    accessToken = jsCookies.get('token') ?? ''
    if (accessToken) {
      headers = {
        authorization: `Bearer ${accessToken}`,
      }
    }
  }

  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'same-origin',
  })

  const authLink = setContext((__, { headers }) => {
    return {
      headers: {
        ...headers,
      },
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
    headers: headers,
  })
  return client
}

export default createApolloClient
