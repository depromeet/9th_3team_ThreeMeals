import { GetServerSideProps } from 'next'
import cookies from 'next-cookies'
import _isEmpty from 'lodash-es/isEmpty'

import { initializeApollo } from '../src/lib/apollo'
import { GET_MY_PROFILE } from '../src/lib/queries/meQueries'

import ContentPage from '../src/components/pages/ContentPage'

const Content: React.FC = () => {
  return <ContentPage />
}

export default Content

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = cookies(ctx).token

  if (_isEmpty(token)) {
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()
  }

  const apolloClient = initializeApollo({}, ctx)
  await apolloClient.query({
    query: GET_MY_PROFILE,
  })
  return {
    props: { initialApolloState: apolloClient.cache.extract() },
  }
}
