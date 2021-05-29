import { GetServerSideProps } from 'next'
import cookies from 'next-cookies'
import _isEmpty from 'lodash-es/isEmpty'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { initializeApollo } from '../../lib/apollo'
import { GET_MY_PROFILE } from '../../lib/queries/meQueries'
import ProfileEditTemplate from '../templates/ProfileEditTemplate'

const ProfileEditPage: React.FC = () => {
  const router = useRouter()

  return (
    <AppContainer>
      <ProfileEditTemplate
        onClickLeft={router.back}
        onClickRight={router.back}
      />
    </AppContainer>
  )
}

export default ProfileEditPage

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

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
