import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import {
  GetAllNotification,
  GET_NOTIFICATIONS,
} from '../../lib/queries/getQueries'
import { getMyAccountInfo, GET_MY_PROFILE } from '../../lib/queries/meQueries'
import NotificationTemplate from '../templates/NotificationTemplate'

const NotificationPage: React.FC = () => {
  const myAccount = useQuery<getMyAccountInfo>(GET_MY_PROFILE)
  const router = useRouter()
  const notification = useQuery<GetAllNotification>(GET_NOTIFICATIONS)

  return (
    <AppContainer>
      <NotificationTemplate
        myAccount={myAccount.data}
        profileImage={IMAGES.background}
        notification={notification.data?.getNotifications}
        onClickLeft={router.back}
      />
    </AppContainer>
  )
}

export default NotificationPage

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
