import { GetServerSideProps } from 'next'
import cookies from 'next-cookies'
import _isEmpty from 'lodash-es/isEmpty'

import { initializeApollo } from '../src/lib/apollo'
import { GET_MY_PROFILE } from '../src/lib/queries/meQueries'

import NewSecretCardPage from '../src/components/pages/NewSecretCardPage'
import {
  GET_MY_NEW_POST_COUNT,
  GET_POST,
} from '../src/lib/queries/getPostQueries'

const NewSecretCard: React.FC = () => {
  return <NewSecretCardPage />
}

export default NewSecretCard

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = cookies(ctx).token

  if (_isEmpty(token)) {
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()
  }

  const apolloClient = initializeApollo({}, ctx)
  const myAccountData = await apolloClient.query({
    query: GET_MY_PROFILE,
  })
  await apolloClient.query({
    query: GET_MY_NEW_POST_COUNT,
    variables: { postType: 'Ask', postState: 'Submitted' },
  })
  await apolloClient.query({
    query: GET_POST,
    variables: {
      first: 10,
      accountId: myAccountData.data.getMyAccountInfo.id,
      postType: 'Ask',
      postState: 'Submitted',
    },
  })
  return {
    props: { initialApolloState: apolloClient.cache.extract() },
  }
}
