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
import { SpacingText } from '../../utils/SpacingText'

/**
 * exist : 질문 한개라도 이미 답변 한 상태
 * request : 질문은 요청 받았지만, 답변은 안한 상태
 * empty : 모두 비어있는 상태
 */
export type EmptyCase = 'exist' | 'request' | 'empty'

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
  onClickLike: (id: string, isLikeActive: boolean) => void
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

  const isExistAsk = useMemo((): EmptyCase => {
    if (
      postContent === undefined ||
      (postContent.ask?.length === 0 && newPostCount === 0)
    ) {
      return 'empty'
    } else if (newPostCount !== 0) {
      return 'request'
    } else return 'exist'
  }, [newPostCount, postContent])

  const isExistOX = useMemo(() => {
    if (
      postContent === undefined ||
      (postContent.quiz?.length === 0 && newPostCount === 0)
    ) {
      return 'empty'
    } else if (newPostCount !== 0) {
      return 'request'
    } else return 'exist'
  }, [newPostCount, postContent])

  const ContentView = useMemo((): ReactElement | undefined => {
    switch (tabIndex) {
      case 0:
        return (
          <>
            <NoticeContainer>
              {isExistAsk === 'empty' ? (
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
                      {`${newPostCount || 0}개 질문에 답하기`}
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
              {isExistAsk === 'exist' ? (
                postContent?.ask.map((data, index) => {
                  return data.node.postState === 'Completed' ? (
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
                      fromAccount={data.node.fromAccount}
                      isLikeActive={data.node.likedPosts.length > 0}
                      isOnNewSecretPage={false}
                      onClickOption={() => {
                        onClickRemove(data.node.id)
                      }}
                      onClickLike={() => {
                        onClickLike(
                          data.node.id,
                          data.node.likedPosts.length > 0
                        )
                      }}
                    />
                  ) : null
                })
              ) : (
                <>
                  <EmptyContainer>
                    {isExistAsk === 'request'
                      ? '질문에 답장을 완료하면 이곳에 카드로 뜰거에요 !'
                      : SpacingText(
                          '아직 도착한 질문이 없네요..ㅠㅠ!\\n친구들에게 링크를 공유해보세요!'
                        )}
                  </EmptyContainer>
                </>
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
                    count={data.node.commentsCount}
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
              {newPostCount === 0 && !isExistOX ? (
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
              {isExistOX ? (
                postContent?.quiz.map((content, index) => {
                  return content.node.comments &&
                    content.node.comments.length > 0 ? (
                    <QuizAnswerCardContainer key={index}>
                      <QuizAnswerCard
                        content={content.node.content}
                        backColor={content.node.color}
                        answerType={content.node.comments[0].content}
                        isMyFeed={true}
                        isLikeActive={content.node.likedPosts.length > 0}
                        onClickOption={() => {
                          onClickRemove(content.node.id)
                        }}
                        onClickLike={() => {
                          onClickLike(
                            content.node.id,
                            content.node.likedPosts.length > 0
                          )
                        }}
                      />
                    </QuizAnswerCardContainer>
                  ) : null
                })
              ) : (
                <></>
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
    isExistAsk,
    postContent?.ask,
    postContent?.answer,
    postContent?.quiz,
    isExistOX,
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
        isProfile={true}
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
          urlName="링크 복사"
          url={
            windowObjet !== undefined
              ? windowObjet.location.origin +
                '/otherscontent/' +
                props.myAccount?.getMyAccountInfo.id
              : ''
          }
          snsInfos={props.myAccount?.getMyAccountInfo.snsInfos}
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

const EmptyContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 40vh;
  font-size: 13px;
  line-height: 22px;
  /* or 169% */
  text-align: center;
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.7);
`
