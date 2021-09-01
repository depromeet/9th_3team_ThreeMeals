import OthersContentPage from '../../src/components/pages/OthersContentPage'
import { GetServerSideProps } from 'next'
import cookies from 'next-cookies'
import _isEmpty from 'lodash-es/isEmpty'
import { useRouter } from 'next/router'
import { initializeApollo } from '../../src/lib/apollo'
import { GET_ACCOUNT_INFO } from '../../src/lib/queries/userQueries'
import { GET_MY_PROFILE } from '../../src/lib/queries/meQueries'

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
  } catch (error) {
    console.error(error)
    return {
      props: {},
      redirect: {
        destination: '/content',
        permanent: false,
      },
    }
  }

  const myData = await apolloClient.query({ query: GET_MY_PROFILE })
  if (myData.data.getMyAccountInfo.id === id) {
    return {
      props: {},
      redirect: {
        destination: '/content',
        permanent: false,
      },
    }
  }
  return {
    props: { initialApolloState: apolloClient.cache.extract() },
  }
}
