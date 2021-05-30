import React, { FC } from 'react'
import Header from '../molecules/Header'
import { IMAGES } from '../../constants/images'
import styled from 'styled-components'
import QuestionCard from '../organisms/QuestionCard'
import PrivateCardLabel from '../atoms/PrivateCardLabel'
interface Props {
  profileImage?: string
  isFinish?: boolean
  onClickLeft?: () => void
  onClickSend: (text: string) => void
}

const NewSecretCardTemplate: FC<Props> = (props) => {
  return (
    <AppContainer>
      <Header
        isLogin
        profileImage={props.profileImage}
        leftIcon={IMAGES.icon_24_back_wh}
        rightIcon={IMAGES.icon_24_drawer}
        onClickLeft={props.onClickLeft}
      />
      <MainContainer>
        <CardCountText>{'12개의 비밀카드 도착'}</CardCountText>
        <ContentContainer>
          <QuestionCard
            labelComponent={<PrivateCardLabel text="BONG IN" active={false} />}
            questionTitle="김덕배님 남자친구는 있으신지요 ????"
            backColor={'#FF833D'}
            isInput
            onClickSend={props.onClickSend}
          />
          <QuestionCard
            questionTitle="김덕배님 남자친구는 있으신지요 ????"
            backColor={'#67D585'}
            isInput
            onClickSend={props.onClickSend}
          />
          <QuestionCard
            questionTitle="김덕배님 남자친구는 있으신지요 ????"
            backColor={'#67D585'}
            isInput
            onClickSend={props.onClickSend}
          />
        </ContentContainer>
      </MainContainer>
    </AppContainer>
  )
}

export default NewSecretCardTemplate

const AppContainer = styled.div`
  color: #ffffff;
  max-width: 500px;
  width: 100%;
`
const MainContainer = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  padding-top: 15px;
`

const CardCountText = styled.div`
  padding: 0 24px;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 800;
  font-size: 17px;
  line-height: 20px;
  letter-spacing: -0.02em;

  color: #ffffff;
  margin-bottom: 20px;
`
const ContentContainer = styled.div``
