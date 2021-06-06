import React, { FC, ReactElement, useCallback, useMemo, useState } from 'react'
import Header from '../molecules/Header'
import { IMAGES } from '../../constants/images'
import styled from 'styled-components'
import ProfileContent from '../molecules/ProfileContent'
import DefaultLine from '../atoms/DefaultLine'
import QuestionCard from '../organisms/QuestionCard'
import PrivateCardLabel from '../atoms/PrivateCardLabel'
import AnswerCard from '../organisms/AnswerCard'
import { NextRouter } from 'next/router'
interface Props {
  router: NextRouter
  profileImage: string
  onClickLeft?: () => void
  onClickAnswerCard: (postId: string) => void
  onClickSecondRight?: () => void
}

const OthersContentTemplate: FC<Props> = (props) => {
  const [tabIndex, setTabIndex] = useState<number>(0)

  const onClickWrite = useCallback(() => {
    if (tabIndex === 0) {
      props.router.push('writePost/Q')
    } else {
      props.router.push('writePost/OX')
    }
  }, [props.router, tabIndex])
  const ContentView = useMemo((): ReactElement | undefined => {
    switch (tabIndex) {
      case 0:
        return (
          <>
            <ContentContainer>
              <QuestionCard
                labelComponent={<PrivateCardLabel text="BONG IN" active />}
                questionTitle="김덕배님 남자친구는 있으신지요 ????"
                backColor={'#FF833D'}
              />
              <QuestionCard
                questionTitle="김덕배님 남자친구는 있으신지요 ????ㅋㅋ"
                backColor={'#67D585'}
              />
              <QuestionCard
                questionTitle="김덕배님 남자친구는 있으신지요 ????ㅋㅋ"
                backColor={'#67D585'}
              />
            </ContentContainer>
          </>
        )
      case 1:
        return (
          <>
            <ContentContainer>
              <AnswerCard
                questionTitle="김덕배님 남자친구는 있으신지요 ????"
                backColor={'#FF833D'}
                onClickPost={() => {
                  props.onClickAnswerCard('0')
                }}
              />
              <AnswerCard
                questionTitle="김덕배님 남자친구는 있으신지요 ????"
                backColor={'#67D585'}
                onClickPost={() => {
                  props.onClickAnswerCard('1')
                }}
              />
              <AnswerCard
                questionTitle="김덕배님 남자친구는 있으신지요 ????"
                backColor={'#67D585'}
                onClickPost={() => {
                  props.onClickAnswerCard('2')
                }}
              />
            </ContentContainer>
          </>
        )
      case 2:
        return (
          <>
            <ContentContainer>
              <QuestionCard
                labelComponent={<PrivateCardLabel text="BONG IN" active />}
                questionTitle="김덕배님 남자친구는 있으신지요 ????"
                backColor={'#FF833D'}
              />
              <QuestionCard
                questionTitle="김덕배님 남자친구는 있으신지요 ????"
                backColor={'#67D585'}
              />
              <QuestionCard
                questionTitle="김덕배님 남자친구는 있으신지요 ????"
                backColor={'#67D585'}
              />
            </ContentContainer>
          </>
        )
      default:
        break
    }
  }, [props, tabIndex])

  return (
    <AppContainer>
      <Header
        isProfile
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
        {ContentView}
      </MainContainer>
      {tabIndex !== 1 && (
        <WriteButton>
          <img onClick={onClickWrite} src={IMAGES.write} width={88} />
        </WriteButton>
      )}
    </AppContainer>
  )
}

export default OthersContentTemplate

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
  cursor: pointer;
`
const ContentContainer = styled.div`
  margin-top: 10px;
`

const WriteButton = styled.div`
  max-width: 500px;
  bottom: 0;
  right: 0;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
`
