import { GetServerSideProps } from 'next'

import ProfilePage from '../src/components/pages/ProfilePage'
import { initializeApollo } from '../src/lib/apollo'
import { GET_MY_NEW_POST_COUNT } from '../src/lib/queries/getQueries'

const Profile: React.FC = () => {
  // const { loading, error, data } = useQuery(GET_MY_NEW_POST_COUNT)

  // if (loading) {
  //   return (
  //     <div>
  //       <p>loading...</p>
  //     </div>
  //   )
  // }

  // if (error) {
  //   console.log('error:', error)
  //   return (
  //     <div>
  //       <p>:( an error happened {error}</p>
  //     </div>
  //   )
  // }
  // console.log('data:', data)
  return <ProfilePage />
}

export default Profile

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeApollo({}, ctx)
  await apolloClient.query({
    query: GET_MY_NEW_POST_COUNT,
  })
  return {
    props: { initialApolloState: apolloClient.cache.extract() },
  }
}
