import React, { FC } from 'react'
import Header from '../molecules/Header'
import { IMAGES } from '../../constants/images'
import styled from 'styled-components'
import AlarmContentField from '../molecules/AlarmContentField'
import { NoticeData } from '../pages/NotificationPage'
interface Props {
  profileImage?: string
  noticeData?: NoticeData[]
  onClickLeft?: () => void
}

const NotificationTemplate: FC<Props> = (props) => {
  return (
    <AppContainer>
      <Header
        isProfile
        leftIcon={IMAGES.icon_24_back_wh}
        rightIcon={IMAGES.icon_24_drawer}
        rightSecondIcon={IMAGES.icon_24_alram2_wh}
        onClickLeft={props.onClickLeft}
      />
      <MainContainer>
        <TapesContainer>
          <img
            src={IMAGES.tape_notification}
            alt="tape_contact"
            width={'100%'}
          />
          <ContentContainer>
            {props.noticeData &&
              props.noticeData.map((value, index) => {
                return (
                  <AlarmContentField
                    key={index}
                    content={value.content}
                    contentType={value.contentType}
                    time={value.time}
                  />
                )
              })}
          </ContentContainer>
        </TapesContainer>
      </MainContainer>
    </AppContainer>
  )
}

export default NotificationTemplate

const AppContainer = styled.div`
  color: #ffffff;
  max-width: 500px;
  width: 100%;
  margin-top: 10px;
`

const MainContainer = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
`

const TapesContainer = styled.div`
  width: 100%;
`

const ContentContainer = styled.div`
  padding: 0 10px;
  margin-top: 10px;

  div {
    margin-bottom: 12px;
  }
`
