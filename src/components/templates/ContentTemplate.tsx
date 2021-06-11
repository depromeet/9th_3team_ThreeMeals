import React, { FC, ReactElement, useMemo, useState } from 'react'
import Header from '../molecules/Header'
import { IMAGES } from '../../constants/images'
import styled from 'styled-components'
import ProfileContent from '../molecules/ProfileContent'
import DefaultLine from '../atoms/DefaultLine'
import QuestionCard from '../organisms/QuestionCard'
import PrivateCardLabel from '../atoms/PrivateCardLabel'
import AnswerCard from '../organisms/AnswerCard'
import { getMyAccountInfo } from '../../lib/queries/meQueries'
import { getPost } from '../../lib/queries/getPostQueries'
import dayjs from 'dayjs'
interface Props {
  getPost?: getPost
  myAccount?: getMyAccountInfo
  isProfile: boolean
  profileImage: string
  onClickLeft?: () => void
  onClickSecondRight?: () => void
  onClickNewSecretCard?: () => void
  onClickAnswerCard: (postId: string) => void
  onClickWrite?: () => void
  onClickRemove: (id: string, tabIndex: number) => void
  onClickLike: (id: string, tabIndex: number) => void
}

const ContentTemplate: FC<Props> = (props) => {
  const [tabIndex, setTabIndex] = useState<number>(0)

  const newPostCount = useMemo(() => {
    const postCount = props.getPost?.getMyNewPostCount.postCount
    const ask = postCount?.find((e) => e.postType === 'Ask')
    const answer = postCount?.find((e) => e.postType === 'Answer')
    const quiz = postCount?.find((e) => e.postType === 'Quiz')

    return {
      ask: ask ? ask.count : 0,
      answer: answer ? answer.count : 0,
      quiz: quiz ? quiz.count : 0,
    }
  }, [props.getPost?.getMyNewPostCount.postCount])

  const postContent = useMemo(() => {
    if (props.getPost?.getPosts.edges) {
      const edges = props.getPost?.getPosts.edges
      const ask = edges?.filter((e) => e.node.postType === 'Ask')
      const answer = edges?.filter((e) => e.node.postType === 'Answer')
      const quiz = edges?.filter((e) => e.node.postType === 'Quiz')

      return {
        ask,
        answer,
        quiz,
      }
    }
  }, [props.getPost?.getPosts.edges])

  console.log('getPost', props.getPost?.getPosts)
  console.log('result', postContent)

  const ContentView = useMemo((): ReactElement | undefined => {
    switch (tabIndex) {
      case 0:
        return (
          <>
            <NoticeContainer>
              <NoticeText>
                <img
                  style={{ position: 'relative', bottom: 15 }}
                  src={IMAGES.img_newq_1}
                  width={106}
                  height={72}
                />
                <span
                  style={{ marginTop: 1, cursor: 'pointer' }}
                  onClick={props.onClickNewSecretCard}
                >
                  {`${
                    (newPostCount.ask && newPostCount.ask) || 0
                  }개의 비밀카드 도착`}
                </span>
                <img
                  onClick={props.onClickNewSecretCard}
                  src={IMAGES.rightButton}
                  width={22}
                  height={22}
                />
              </NoticeText>
              <img
                style={{ position: 'relative', bottom: 65, zIndex: -1 }}
                src={IMAGES.img_tape_newq}
                width={'100%'}
              />
            </NoticeContainer>
            <ContentContainer>
              {postContent?.ask.map((e, index) => {
                return (
                  <QuestionCard
                    key={index}
                    labelComponent={
                      <PrivateCardLabel text="BONG IN" active={false} />
                    }
                    questionTitle="김덕배님 남자친구는 있으신지요 ????"
                    backColor={'#FF833D'}
                    onClickOption={() => {
                      props.onClickRemove('0', tabIndex)
                    }}
                    onClickLike={() => {
                      props.onClickLike('0', tabIndex)
                    }}
                  />
                )
              })}
            </ContentContainer>
          </>
        )
      case 1:
        return (
          <>
            <NoticeContainer>
              <NoticeText>
                <img
                  style={{ position: 'relative', bottom: 15 }}
                  src={IMAGES.img_newq_1}
                  width={106}
                  height={72}
                />
                <span
                  style={{ marginTop: 1, cursor: 'pointer' }}
                  onClick={props.onClickNewSecretCard}
                >
                  {`${
                    (newPostCount.answer && newPostCount.answer) || 0
                  }개의 비밀카드 도착`}
                </span>
                <img
                  onClick={props.onClickNewSecretCard}
                  src={IMAGES.rightButton}
                  width={22}
                  height={22}
                />
              </NoticeText>
              <img
                style={{ position: 'relative', bottom: 65, zIndex: -1 }}
                src={IMAGES.img_tape_newq}
                width={'100%'}
              />
            </NoticeContainer>
            <ContentContainer>
              {postContent?.answer.map((data, index) => {
                return (
                  <AnswerCard
                    key={index}
                    isContent
                    id={'0'}
                    time={data.node.createdAt}
                    questionTitle="김덕배님 남자친구는 있으신지요 ????"
                    backColor={'#FF833D'}
                    onClickPost={() => {
                      props.onClickAnswerCard('0')
                    }}
                    onClickOption={() => {
                      props.onClickRemove('0', tabIndex)
                    }}
                  />
                )
              })}
            </ContentContainer>
          </>
        )
      case 2:
        return (
          <>
            <NoticeContainer>
              <NoticeText>
                <img
                  style={{ position: 'relative', bottom: 15 }}
                  src={IMAGES.img_newq_1}
                  width={106}
                  height={72}
                />
                <span
                  style={{ marginTop: 1 }}
                  onClick={props.onClickNewSecretCard}
                >
                  {`${
                    (newPostCount.quiz && newPostCount.quiz) || 0
                  }개의 비밀카드 도착`}
                </span>
                <img
                  onClick={props.onClickNewSecretCard}
                  src={IMAGES.rightButton}
                  width={22}
                  height={22}
                />
              </NoticeText>
              <img
                style={{ position: 'relative', bottom: 65, zIndex: -1 }}
                src={IMAGES.img_tape_newq}
                width={'100%'}
              />
            </NoticeContainer>
            <ContentContainer>
              {postContent?.quiz.map((e, index) => {
                return (
                  <QuestionCard
                    key={index}
                    labelComponent={
                      <PrivateCardLabel text="BONG IN" active={false} />
                    }
                    questionTitle="김덕배님 남자친구는 있으신지요 ????"
                    backColor={'#FF833D'}
                  />
                )
              })}
            </ContentContainer>
          </>
        )
      default:
        break
    }
  }, [
    newPostCount.answer,
    newPostCount.ask,
    newPostCount.quiz,
    postContent?.answer,
    postContent?.ask,
    postContent?.quiz,
    props,
    tabIndex,
  ])

  const profileImage = useMemo(() => {
    return props.myAccount?.getMyAccountInfo.image
  }, [props.myAccount?.getMyAccountInfo.image])

  return (
    <AppContainer>
      <Header
        isLogin={props.myAccount ? true : false}
        isProfile={profileImage ? true : false}
        profileImage={profileImage}
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
      {tabIndex === 1 && (
        <WriteButton>
          <img onClick={props.onClickWrite} src={IMAGES.write} width={88} />
        </WriteButton>
      )}
    </AppContainer>
  )
}

export default React.memo(ContentTemplate)

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

const WriteButton = styled.button.attrs({ type: 'button' })`
  bottom: 0;
  right: 0;
  position: fixed;
  overflow-y: auto;
  overflow-x: hidden;

  @media all and (min-width: 515px) {
    margin-right: -webkit-calc((100% - 400px) / 2);
    margin-right: -moz-calc((100% - 400px) / 2);
    margin-right: calc((100% - 400px) / 2);
  }
  @media all and (max-width: 515px) {
    margin-right: -webkit-calc((7%) / 2);
    margin-right: -moz-calc((7%) / 2);
    margin-right: calc((7%) / 2);
  }
`
