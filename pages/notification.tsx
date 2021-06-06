import { GetServerSideProps } from 'next'
import NotificationPage from '../src/components/pages/NotificationPage'
import { initializeApollo } from '../src/lib/apollo'
import { GET_NOTIFICATIONS } from '../src/lib/queries/getQueries'

const Notification: React.FC = () => {
  return <NotificationPage />
}

export default Notification

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeApollo({}, ctx)
  await apolloClient.query({
    query: GET_NOTIFICATIONS,
  })
  return {
    props: { initialApolloState: apolloClient.cache.extract() },
  }
}
