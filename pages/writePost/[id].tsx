import WritePostPage from '../../src/components/pages/WritePostPage'
import { GetServerSideProps } from 'next'
import cookies from 'next-cookies'
import { initializeApollo } from '../../src/lib/apollo'
import _isEmpty from 'lodash-es/isEmpty'
import { GET_ALL_EMOTICONS } from '../../src/lib/queries/getQueries'
import { GET_MY_PROFILE } from '../../src/lib/queries/meQueries'
const WritePost: React.FC = () => {
  return <WritePostPage />
}

export default WritePost

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = cookies(ctx).token
  const param = ctx.params
  if (_isEmpty(token)) {
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()
  }

  const apolloClient = initializeApollo({}, ctx)
  await apolloClient.query({
    query: GET_MY_PROFILE,
  })
  if (param?.id !== 'OX') {
    await apolloClient.query({
      query: GET_ALL_EMOTICONS,
    })
  }
  return {
    props: { initialApolloState: apolloClient.cache.extract() },
  }
}
