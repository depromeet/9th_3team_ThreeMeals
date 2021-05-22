import * as React from 'react'
import { storiesOf } from '@storybook/react'
import NotificationTemplate from '../../components/templates/NotificationTemplate'
import { NoticeData } from '../../components/pages/NotificationPage'
import styled from 'styled-components'

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
storiesOf('templates/Notification', module).add('NotificationTemplate', () => {
  return (
    <AppContainer>
      <NotificationTemplate noticeData={dummyData} />
    </AppContainer>
  )
})

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
