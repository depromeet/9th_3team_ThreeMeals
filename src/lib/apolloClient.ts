import {
  isLazyGetToken,
  updateIsLazyGetToken,
} from './localStore/signInMonitoring'
import { GetServerSidePropsContext } from 'next'
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  from,
} from '@apollo/client'
import cookies from 'next-cookies'
import jsCookies from 'js-cookie'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import { relayStylePagination } from '@apollo/client/utilities'

function createApolloClient(
  ctx?: GetServerSidePropsContext
): ApolloClient<NormalizedCacheObject> {
  let accessToken = ''
  if (ctx) {
    // 서버 사이드
    accessToken = cookies(ctx).token ?? ''
  } else if (typeof window !== 'undefined') {
    // 클라이언트에서는 브라우저 쿠키를 참조
    if (isLazyGetToken()) {
      /** 처음 로그인시 */
      // HACK: setTimeout
      setTimeout(() => {
        if (jsCookies.get('token')) {
          accessToken = jsCookies.get('token') ?? ''
          updateIsLazyGetToken(false)
        } else {
          console.error('non authorization token')
        }
      }, 800)
    } else {
      accessToken = jsCookies.get('token') ?? ''
    }
  }

  // const httpLink = createHttpLink({
  //   uri: process.env.NEXT_PUBLIC_API_URL,
  //   credentials: 'same-origin',
  // })

  const authLink = setContext((__, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    }
  })

  const additiveLink = from([
    authLink,
    createUploadLink({ uri: process.env.NEXT_PUBLIC_API_URL }),
  ])

  const client = new ApolloClient({
    link: additiveLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getPosts: relayStylePagination(),
          },
        },
      },
    }),
    ssrMode: typeof window === 'undefined',
    connectToDevTools: process.env.NODE_ENV !== 'production',
  })

  return client
}

export default createApolloClient
