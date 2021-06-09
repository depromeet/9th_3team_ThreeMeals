import AnswerDetailPage from '../src/components/pages/AnswerDetailPage'
import { GetServerSideProps } from 'next'
import cookies from 'next-cookies'
import { initializeApollo } from '../src/lib/apollo'
import _isEmpty from 'lodash-es/isEmpty'
import { GET_PARENT_COMMENTS } from '../src/lib/queries/getCommentsQueries'
const AnswerDetail: React.FC = (initialApolloState) => {
  return <AnswerDetailPage data={initialApolloState} />
}

export default AnswerDetail

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = cookies(ctx).token
  const param = ctx.params
  if (_isEmpty(token)) {
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()
  }

  const apolloClient = initializeApollo({}, ctx)
  await apolloClient.query({
    query: GET_PARENT_COMMENTS,
    variables: { first: 10, postId: '1' },
  })
  return {
    props: { initialApolloState: apolloClient.cache.extract() },
  }
}
