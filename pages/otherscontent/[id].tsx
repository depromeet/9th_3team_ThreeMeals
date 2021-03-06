import OthersContentPage from '../../src/components/pages/OthersContentPage'
import { GetServerSideProps } from 'next'
import { initializeApollo } from '../../src/lib/apollo'
import { GET_ACCOUNT_INFO } from '../../src/lib/queries/userQueries'
import { GET_MY_PROFILE } from '../../src/lib/queries/meQueries'
import { GET_POST } from '../../src/lib/queries/getPostQueries'
import { GET_FAVORITES } from '../../src/lib/queries/getQueries'

const OthersContent: React.FC = () => {
  return <OthersContentPage />
}

export default OthersContent

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query
  const apolloClient = initializeApollo({}, ctx)
  try {
    await apolloClient.query({
      query: GET_ACCOUNT_INFO,
      variables: {
        accountId: id,
      },
    })
    await apolloClient.query({
      query: GET_POST,
      variables: {
        first: 10,
        accountId: id,
        postType: 'Ask',
        postState: 'Completed',
      },
    })
  } catch (error) {
    console.error(error)
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  try {
    const myData = await apolloClient.query({ query: GET_MY_PROFILE })
    if (myData) {
      await apolloClient.query({
        query: GET_FAVORITES,
      })
    }
    if (myData.data.getMyAccountInfo.id === id) {
      return {
        props: {},
        redirect: {
          destination: '/content',
          permanent: false,
        },
      }
    }
  } catch (error) {
    console.error('non-members')
  }

  return {
    props: { initialApolloState: apolloClient.cache.extract() },
  }
}
