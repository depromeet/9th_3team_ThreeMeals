import React, { FC, useState } from 'react'
import Header from '../molecules/Header'
import { IMAGES } from '../../constants/images'
import styled from 'styled-components'
import ProfileContent from '../molecules/ProfileContent'
import DefaultLine from '../atoms/DefaultLine'
import QuestionCard from '../organisms/QuestionCard'
import PrivateCardLabel from '../atoms/PrivateCardLabel'
interface Props {
  isProfile: boolean
  profileImage: string
  onClickLeft?: () => void
  onClickSecondRight?: () => void
}

const ContactUsTemplate: FC<Props> = (props) => {
  const [tabIndex, setTabIndex] = useState<number>(0)

  return (
    <AppContainer>
      <Header
        isProfile={props.isProfile}
        profileImage={props.profileImage}
        rightIcon={IMAGES.icon_24_drawer}
        rightSecondIcon={IMAGES.icon_24_alram2_wh}
        onClickSecondRight={props.onClickSecondRight}
        onClickLeft={props.onClickLeft}
      />
      <MainContainer>
        <ProfileContent
          name="김덕배"
          desc="관종이라 자주올림.. 아몰랑~ 그냥 써 🍻"
          urlName="@nijo.s"
          url="https://google.com"
        />
        <TabContainer>
          <Tab
            style={
              tabIndex === 0
                ? {
                    borderBottom: 1,
                    borderColor: 'white',
                    borderStyle: 'solid',
                  }
                : undefined
            }
            onClick={() => {
              setTabIndex(0)
            }}
          >
            물어봐
          </Tab>
          <Tab
            style={
              tabIndex === 1
                ? {
                    borderBottom: 1,
                    borderColor: 'white',
                    borderStyle: 'solid',
                  }
                : undefined
            }
            onClick={() => {
              setTabIndex(1)
            }}
          >
            답해줘
          </Tab>
          <Tab
            style={
              tabIndex === 2
                ? {
                    borderBottom: 1,
                    borderColor: 'white',
                    borderStyle: 'solid',
                  }
                : undefined
            }
            onClick={() => {
              setTabIndex(2)
            }}
          >
            OX퀴즈
          </Tab>
        </TabContainer>
        <DefaultLine
          containerStyle={{ position: 'relative', bottom: 8, zIndex: -1 }}
        />
        <NoticeContainer>
          <NoticeText>
            <img
              style={{ position: 'relative', bottom: 15 }}
              src={IMAGES.img_newq_1}
              width={106}
              height={72}
            />
            <span style={{ marginTop: 1 }}>{'12개의 비밀카드 도착'}</span>
            <img src={IMAGES.rightButton} width={22} height={22} />
          </NoticeText>
          <img
            style={{ position: 'relative', bottom: 65, zIndex: -1 }}
            src={IMAGES.img_tape_newq}
            width={'100%'}
          />
        </NoticeContainer>
        <ContentContainer>
          <QuestionCard
            labelComponent={<PrivateCardLabel text="BONG IN" />}
            questionTitle="김덕배님 남자친구는 있으신지요 ????"
            backColor="#FF833D"
          />
          <QuestionCard
            questionTitle="김덕배님 남자친구는 있으신지요 ????"
            backColor="#FF833D"
          />
          <QuestionCard
            questionTitle="김덕배님 남자친구는 있으신지요 ????"
            backColor="#FF833D"
          />
        </ContentContainer>
      </MainContainer>
    </AppContainer>
  )
}

export default ContactUsTemplate

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

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  margin-bottom: 7px;
`

const Tab = styled.div`
  font-family: Apple SD Gothic Neo;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  /* identical to box height, or 133% */

  letter-spacing: -0.02em;

  color: #ffffff;
  margin-left: 24px;

  padding-bottom: 7px;
`

const NoticeContainer = styled.div`
  margin-top: 32px;
`
const NoticeText = styled.div`
  display: flex;
  justify-content: center;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  /* identical to box height, or 157% */

  text-align: center;
  letter-spacing: -0.04em;

  color: rgba(255, 255, 255, 0.8);

  opacity: 0.9;
`

const ContentContainer = styled.div``
