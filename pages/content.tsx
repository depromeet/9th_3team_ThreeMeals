import { GetServerSideProps } from 'next'
import cookies from 'next-cookies'
import _isEmpty from 'lodash-es/isEmpty'
import { initializeApollo } from '../src/lib/apollo'
import { GET_MY_PROFILE } from '../src/lib/queries/meQueries'
import ContentPage from '../src/components/pages/ContentPage'
import {
  GET_MY_NEW_POST_COUNT,
  GET_POST,
} from '../src/lib/queries/getPostQueries'
import { GET_UNREAD_NOTI_COUNT } from '../src/lib/queries/getQueries'

const Content: React.FC = () => {
  return <ContentPage />
}

export default Content

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = cookies(ctx).token
  const otherId = cookies(ctx).beginningRoutingToOtherId
  if (_isEmpty(token)) {
    // ctx.res.writeHead(302, { Location: '/' })
    // ctx.res.end()
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  if (otherId) {
    return {
      props: {},
      redirect: {
        destination: `/otherscontent/${otherId}`,
        permanent: false,
      },
    }
  }
  const apolloClient = initializeApollo({}, ctx)
  try {
    const myAccountData = await apolloClient.query({
      query: GET_MY_PROFILE,
    })
    await apolloClient.query({
      query: GET_POST,
      variables: {
        first: 10,
        accountId: myAccountData.data.getMyAccountInfo.id,
        postType: 'Ask',
        postState: 'Completed',
      },
    })
    await apolloClient.query({
      query: GET_MY_NEW_POST_COUNT,
      variables: { postType: 'Ask', postState: 'Submitted' },
    })
    await apolloClient.query({
      query: GET_UNREAD_NOTI_COUNT,
    })
  } catch (error) {
    console.error('get query Error:', error)

    /** let token expired */
    if (token) {
      ctx.res.setHeader('Set-Cookie', `token=; path=/; expires=-1`)
    }
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { initialApolloState: apolloClient.cache.extract() },
  }
}
