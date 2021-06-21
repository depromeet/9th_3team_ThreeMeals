import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react'
import Header from '../molecules/Header'
import { IMAGES } from '../../constants/images'
import styled from 'styled-components'
import ProfileContent from '../molecules/ProfileContent'
import DefaultLine from '../atoms/DefaultLine'
import QuestionCard from '../organisms/QuestionCard'
import AnswerCard from '../organisms/AnswerCard'
import { getMyAccountInfo } from '../../lib/queries/meQueries'
import { getPost } from '../../lib/queries/getPostQueries'
import QuizAnswerCard from '../organisms/QuizAnswerCard'

interface Props {
  tabIndex: number
  getUnreadNotiCount?: number
  newPostCount: number
  getPost?: getPost
  myAccount?: getMyAccountInfo
  isProfile: boolean
  profileImage: string
  onClickTabIndex: (index: number) => void
  onClickLeft?: () => void
  onClickSecondRight?: () => void
  onClickNewSecretCard: (tabName: string) => void
  onClickAnswerCard: (postId: string, isMine: boolean) => void
  onClickWrite?: () => void
  onClickRemove: (id: string) => void
  onClickLike: (id: string, tabIndex: number) => void
}

const ContentTemplate: FC<Props> = (props) => {
  const [windowObjet, setWindowObjet] = useState<Window | undefined>()
  const {
    tabIndex,
    newPostCount,
    onClickNewSecretCard,
    onClickRemove,
    onClickAnswerCard,
    onClickLike,
  } = props
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

  const ContentView = useMemo((): ReactElement | undefined => {
    switch (tabIndex) {
      case 0:
        return (
          <>
            <NoticeContainer>
              {newPostCount === 0 ? (
                <img
                  style={{ position: 'relative', bottom: 15, zIndex: -1 }}
                  src={IMAGES.img_tape_empty}
                  width={'100%'}
                />
              ) : (
                <>
                  <NoticeText>
                    <img
                      style={{ position: 'relative', bottom: 15 }}
                      src={IMAGES.img_newq_1}
                      width={106}
                      height={72}
                    />
                    <span
                      style={{ marginTop: 1, cursor: 'pointer' }}
                      onClick={() => onClickNewSecretCard('ask')}
                    >
                      {`${newPostCount || 0}개의 비밀카드 도착`}
                    </span>
                    <img
                      onClick={() => onClickNewSecretCard('ask')}
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
                </>
              )}
            </NoticeContainer>
            <ContentContainer>
              {postContent && postContent.ask.length > 0 ? (
                postContent?.ask.map((data, index) => {
                  return (
                    <QuestionCard
                      key={index}
                      id={data.node.id}
                      questionTitle={data.node.content}
                      backColor={data.node.color}
                      stickers={data.node.usedEmoticons}
                      comments={data.node.comments}
                      createdAt={data.node.createdAt}
                      updatedAt={data.node.updatedAt}
                      secretType={data.node.secretType}
                      onClickOption={() => {
                        onClickRemove(data.node.id)
                      }}
                      onClickLike={() => {
                        onClickLike(data.node.id, tabIndex)
                      }}
                    />
                  )
                })
              ) : (
                <BackgroundSticker src={IMAGES.backgroundSticker} />
              )}
            </ContentContainer>
          </>
        )
      case 1:
        return (
          <>
            <ContentContainer>
              {postContent?.answer.map((data, index) => {
                return (
                  <AnswerCard
                    key={index}
                    isContent
                    userId={props.myAccount?.getMyAccountInfo.id}
                    id={data.node.id}
                    time={data.node.createdAt}
                    questionTitle={data.node.content}
                    backColor={data.node.color}
                    stickers={data.node.usedEmoticons}
                    onClickPost={() => {
                      onClickAnswerCard(data.node.id, true)
                    }}
                    onClickOption={() => {
                      onClickRemove(data.node.id)
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
              {newPostCount === 0 ? (
                <img
                  style={{ position: 'relative', bottom: 15, zIndex: -1 }}
                  src={IMAGES.img_tape_empty}
                  width={'100%'}
                />
              ) : (
                <>
                  <NoticeText>
                    <img
                      style={{ position: 'relative', bottom: 15 }}
                      src={IMAGES.img_newq_1}
                      width={106}
                      height={72}
                    />
                    <span
                      style={{ marginTop: 1, cursor: 'pointer' }}
                      onClick={() => onClickNewSecretCard('OX')}
                    >
                      {`${newPostCount || 0}개의 OX퀴즈 도착`}
                    </span>
                    <img
                      onClick={() => onClickNewSecretCard('OX')}
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
                </>
              )}
            </NoticeContainer>
            <ContentContainer>
              {postContent && postContent.quiz.length > 0 ? (
                postContent?.quiz.map((content, index) => {
                  return content.node.comments &&
                    content.node.comments.length > 0 ? (
                    <QuizAnswerCardContainer key={index}>
                      <QuizAnswerCard
                        content={content.node.content}
                        backColor={content.node.color}
                        answerType={true}
                        isMyFeed={true}
                      />
                    </QuizAnswerCardContainer>
                  ) : null
                })
              ) : (
                <BackgroundSticker src={IMAGES.backgroundSticker} />
              )}
            </ContentContainer>
          </>
        )
      default:
        break
    }
  }, [
    tabIndex,
    newPostCount,
    postContent,
    onClickNewSecretCard,
    onClickRemove,
    onClickLike,
    props.myAccount?.getMyAccountInfo.id,
    onClickAnswerCard,
  ])

  const profileImage = useMemo(() => {
    return props.myAccount?.getMyAccountInfo.image
  }, [props.myAccount?.getMyAccountInfo.image])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowObjet(window)
    }
  }, [])

  return (
    <AppContainer>
      <Header
        isLogin={props.myAccount ? true : false}
        isProfile={profileImage ? true : false}
        profileImage={profileImage}
        rightIcon={IMAGES.icon_24_drawer}
        rightSecondIcon={
          props.getUnreadNotiCount && props.getUnreadNotiCount > 0
            ? IMAGES.icon_24_alram2_wh
            : IMAGES.icon_24_alram_wh
        }
        onClickSecondRight={props.onClickSecondRight}
        onClickLeft={props.onClickLeft}
      />
      <MainContainer>
        <ProfileContent
          name={
            props.myAccount?.getMyAccountInfo.nickname ||
            '닉네임을 입력해주세요.'
          }
          desc={
            props.myAccount?.getMyAccountInfo.content || '소개를 입력해주세요.'
          }
          urlName="프로필"
          url={
            windowObjet !== undefined
              ? windowObjet.location.origin +
                '/otherscontent/' +
                props.myAccount?.getMyAccountInfo.id
              : ''
          }
        />
        <TabContainer>
          <Tab
            style={
              props.tabIndex === 0
                ? {
                    borderBottom: 1,
                    borderColor: 'white',
                    borderStyle: 'solid',
                  }
                : undefined
            }
            onClick={() => {
              props.onClickTabIndex(0)
            }}
          >
            물어봐
          </Tab>
          <Tab
            style={
              props.tabIndex === 1
                ? {
                    borderBottom: 1,
                    borderColor: 'white',
                    borderStyle: 'solid',
                  }
                : undefined
            }
            onClick={() => {
              props.onClickTabIndex(1)
            }}
          >
            답해줘
          </Tab>
          <Tab
            style={
              props.tabIndex === 2
                ? {
                    borderBottom: 1,
                    borderColor: 'white',
                    borderStyle: 'solid',
                  }
                : undefined
            }
            onClick={() => {
              props.onClickTabIndex(2)
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
      {postContent && props.tabIndex === 1 ? (
        postContent.answer.length > 0 ? (
          <WriteButton>
            <img onClick={props.onClickWrite} src={IMAGES.write} width={88} />
          </WriteButton>
        ) : (
          <WriteButton>
            <img
              onClick={props.onClickWrite}
              src={IMAGES.icon_write_gr}
              width={88}
            />
          </WriteButton>
        )
      ) : null}
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

const QuizAnswerCardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`
const BackgroundSticker = styled.img`
  position: fixed;
  width: 214px;
  height: 191px;
  bottom: 15px;
  right: 15px;
`
