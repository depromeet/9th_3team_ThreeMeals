import { useRouter } from 'next/router'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import NotificationTemplate from '../templates/NotificationTemplate'

export interface NoticeData {
  content: string
  contentType: string
  time: string
}

const NotificationPage: React.FC = () => {
  const router = useRouter()

  const dummyData: NoticeData[] = [
    {
      content: '12개의 새로운 카드가 작성되었습니다.',
      contentType: '김덕배님의 물어봐',
      time: '1분전',
    },
    {
      content: '12개의 새로운 카드가 작성되었습니다.',
      contentType: '김덕배님의 물어봐',
      time: '2분전',
    },
    {
      content: '12개의 새로운 카드가 작성되었습니다.',
      contentType: '김덕배님의 물어봐',
      time: '3분전',
    },
    {
      content: '12개의 새로운 카드가 작성되었습니다.',
      contentType: '김덕배님의 물어봐',
      time: '4분전',
    },
  ]
  return (
    <AppContainer>
      <NotificationTemplate
        profileImage={IMAGES.background}
        noticeData={dummyData}
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
