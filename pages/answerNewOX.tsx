import AnswerNewOXPage from '../src/components/pages/AnswerNewOXPage'
import { GetServerSideProps } from 'next'
import cookies from 'next-cookies'
import { initializeApollo } from '../src/lib/apollo'
import { GET_MY_PROFILE } from '../src/lib/queries/meQueries'
import _isEmpty from 'lodash-es/isEmpty'
import { GET_POST } from '../src/lib/queries/getPostQueries'
const AnswerDetail: React.FC = () => {
  return <AnswerNewOXPage />
}

export default AnswerDetail

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
    query: GET_POST,
    variables: {
      first: 10,
      accountId: myAccountData.data.getMyAccountInfo.id,
      postType: 'Quiz',
      postState: 'Submitted',
    },
  })
  return {
    props: { initialApolloState: apolloClient.cache.extract() },
  }
}
