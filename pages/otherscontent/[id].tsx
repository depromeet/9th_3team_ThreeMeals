import OthersContentPage from '../../src/components/pages/OthersContentPage'
import { GetServerSideProps } from 'next'
import cookies from 'next-cookies'
import _isEmpty from 'lodash-es/isEmpty'

import { initializeApollo } from '../../src/lib/apollo'
import { GET_ACCOUNT_INFO } from '../../src/lib/queries/userQueries'

const OthersContent: React.FC = () => {
  return <OthersContentPage />
}

export default OthersContent

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query
  const apolloClient = initializeApollo({}, ctx)
  await apolloClient.query({
    query: GET_ACCOUNT_INFO,
    variables: {
      accountId: id,
    },
  })
  return {
    props: { initialApolloState: apolloClient.cache.extract() },
  }
}
