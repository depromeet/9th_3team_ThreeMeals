import React, {
  Dispatch,
  useRef,
  forwardRef,
  ReactElement,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Header from '../molecules/Header'
import { IMAGES } from '../../constants/images'
import styled from 'styled-components'
import ProfileContent from '../molecules/ProfileContent'
import DefaultLine from '../atoms/DefaultLine'
import QuestionCard from '../organisms/QuestionCard'
import AnswerCard from '../organisms/AnswerCard'
import { useRouter } from 'next/router'
import { getAccountInfo } from '../../lib/queries/userQueries'
import { getPost, getPostEdges } from '../../lib/queries/getPostQueries'
import QuizAnswerCard from '../organisms/QuizAnswerCard'
import { getMyAccountInfo } from '../../lib/queries/meQueries'
import { SpacingText } from '../../utils/SpacingText'
import { EmptyCase } from './ContentTemplate'
import { useReactiveVar } from '@apollo/client'
import { curTabIdx } from '../../lib/localStore/contentTabIndex'
import {
  linkedPostId,
  updateLinkedPostId,
} from '../../lib/localStore/notiLinkInfo'

interface Props {
  token?: string
  getPost?: getPost
  getUnreadNotiCount?: number
  myAccount?: getMyAccountInfo
  account?: getAccountInfo
  profileImage: string
  isFavoriteAccount: boolean
  onClickTabIndex: (index: number) => void
  onClickLeft?: () => void
  onClickAnswerCard: (postId: string) => void
  onClickSecondRight?: () => void
  onClickBookMark: (isBookMarkActive: boolean | undefined) => void
}

const OthersContentTemplate = forwardRef<
  | HTMLDivElement
  | Dispatch<SetStateAction<RefObject<HTMLDivElement | null> | null>>
  | null,
  Props
>((props, ref) => {
  const cardRefForNotiLink = useRef<HTMLDivElement | null>(null)
  const currentTabIdx = useReactiveVar(curTabIdx)
  const [windowObjet, setWindowObjet] = useState<Window | undefined>()
  const router = useRouter()
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
  const onClickWrite = useCallback(() => {
    if (props.token) {
      if (currentTabIdx === 0) {
        router.push(
          `/writePost/Ask?otherId=${props.account?.getAccountInfo.id}`
        )
      } else {
        router.push(
          `/writePost/Quiz?otherId=${props.account?.getAccountInfo.id}`
        )
      }
    } else {
      window.alert('???????????? ????????????.')
      window.Kakao.Auth.authorize({
        redirectUri: `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/auth`,
      })
    }
  }, [props.account?.getAccountInfo.id, props.token, router, currentTabIdx])

  const isExistAsk = useMemo((): EmptyCase => {
    if (postContent === undefined || postContent.ask?.length === 0) {
      return 'empty'
    } else return 'exist'
  }, [postContent])

  const isExistOX = useMemo(() => {
    if (postContent === undefined || postContent.quiz?.length === 0) {
      return 'empty'
    } else return 'exist'
  }, [postContent])

  const isAskOrOXTab =
    (postContent && currentTabIdx === 0) || (postContent && currentTabIdx === 2)

  const isPostCntMoreThanOne =
    (postContent && currentTabIdx === 0 && postContent.ask.length >= 2) ||
    (postContent && currentTabIdx === 2 && postContent.quiz.length >= 2)

  /** scroll to linked notification post */
  useEffect(() => {
    if (cardRefForNotiLink.current) {
      cardRefForNotiLink.current.scrollIntoView({ block: 'center' })
      updateLinkedPostId('')
    }
  }, [cardRefForNotiLink.current])

  const ContentView = useMemo((): ReactElement | undefined => {
    switch (currentTabIdx) {
      case 0:
        return (
          <>
            <ContentContainer>
              {isExistAsk === 'exist' ? (
                postContent?.ask.map((content, index) => {
                  const questionCardComponent = (
                    <div
                      ref={
                        linkedPostId() === content.node.id
                          ? cardRefForNotiLink
                          : undefined
                      }
                      key={index}
                    >
                      <QuestionCard
                        id={content.node.id}
                        createdAt={content.node.createdAt}
                        updatedAt={content.node.updatedAt}
                        secretType={content.node.secretType}
                        questionTitle={content.node.content}
                        backColor={content.node.color}
                        stickers={content.node.usedEmoticons}
                        isLikeActive={content.node.likedPosts.length > 0}
                        isOnNewSecretPage={false}
                        comments={content.node.comments}
                        fromAccount={content.node.fromAccount}
                      />
                    </div>
                  )
                  const isLastPost = index === postContent.ask.length - 1
                  return isLastPost ? (
                    <div
                      ref={ref as RefObject<HTMLDivElement>}
                      key={content.node.id}
                    >
                      {questionCardComponent}
                    </div>
                  ) : (
                    questionCardComponent
                  )
                })
              ) : (
                <EmptyContainer>
                  {'?????? ??????????????? ?????????. ?????? ?????? ??????????????????!'}
                </EmptyContainer>
              )}
            </ContentContainer>
          </>
        )
      case 1:
        return (
          <>
            <TobeContinueContainer>
              {SpacingText(
                '????????? ????????? ?????????. \\n ???????????? OX??? ??????????????? ????????? ???????????????.'
              )}
            </TobeContinueContainer>
            {/* To be continue */}
            {/* <ContentContainer>
              {postContent && postContent.answer.length > 0 ? (
                postContent?.answer.map((data, index) => {
                  return (
                    <AnswerCard
                      key={index}
                      isContent
                      id={data.node.id}
                      time={data.node.createdAt}
                      questionTitle={data.node.content}
                      backColor={data.node.color}
                      stickers={data.node.usedEmoticons}
                      count={data.node.commentsCount}
                      onClickPost={() => {
                        props.onClickAnswerCard(data.node.id)
                      }}
                    />
                  )
                })
              ) : (
                <BackgroundSticker src={IMAGES.backgroundSticker} />
              )}
            </ContentContainer> */}
          </>
        )
      case 2:
        return (
          <>
            <ContentContainer>
              {isExistOX === 'exist' ? (
                postContent?.quiz.map((content, index) => {
                  const quizAnswerCardComponent = (
                    <QuizAnswerCardContainer
                      key={index}
                      ref={
                        linkedPostId() === content.node.id
                          ? cardRefForNotiLink
                          : undefined
                      }
                    >
                      <QuizAnswerCard
                        content={content.node.content}
                        backColor={content.node.color}
                        answerType={content.node.comments[0].content}
                        isMyFeed={false}
                        isLikeActive={content.node.likedPosts.length > 0}
                        cardContainerStyle={{
                          height: '100%',
                          minHeight: '360px',
                        }}
                      />
                    </QuizAnswerCardContainer>
                  )
                  const isLastPost = index === postContent.quiz.length - 1
                  return isLastPost ? (
                    <div
                      ref={ref as RefObject<HTMLDivElement>}
                      key={content.node.id}
                    >
                      {quizAnswerCardComponent}
                    </div>
                  ) : (
                    quizAnswerCardComponent
                  )
                })
              ) : (
                <EmptyContainer>
                  {'?????? ??????????????? ?????????. ?????? ?????? ??????????????????!'}
                </EmptyContainer>
              )}
            </ContentContainer>
          </>
        )
      default:
        break
    }
  }, [currentTabIdx, isExistAsk, postContent, isExistOX, ref])

  const profileImage = useMemo(() => {
    return props.account?.getAccountInfo.image
  }, [props.account?.getAccountInfo.image])
  const myProfileImage = useMemo(() => {
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
        isOthersContent
        isLogin={props.myAccount ? true : false}
        isProfile={true}
        profileImage={profileImage}
        myProfileImage={myProfileImage}
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
          isMyProfile={false}
          isFavoriteAccount={props.isFavoriteAccount}
          name={
            props.account?.getAccountInfo.nickname || '???????????? ??????????????????.'
          }
          desc={props.account?.getAccountInfo.content || '????????? ??????????????????.'}
          urlName="?????? ??????"
          url={
            windowObjet !== undefined
              ? windowObjet.location.origin +
                '/otherscontent/' +
                props.account?.getAccountInfo.id
              : ''
          }
          snsInfos={props.account?.getAccountInfo.snsInfos}
          onClickBookMark={props.onClickBookMark}
        />
        <TabContainer>
          <Tab
            style={
              currentTabIdx === 0
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
            ?????????
          </Tab>
          <Tab
            style={
              currentTabIdx === 2
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
            OX??????
          </Tab>
          <Tab
            style={
              currentTabIdx === 1
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
            <TobeContinueTitle>?????????</TobeContinueTitle>
          </Tab>
        </TabContainer>
        <DefaultLine
          containerStyle={{ position: 'relative', bottom: 8, zIndex: -1 }}
        />
        {ContentView}
      </MainContainer>
      {isAskOrOXTab ? (
        isPostCntMoreThanOne ? (
          <WriteButton>
            <img onClick={onClickWrite} src={IMAGES.write} width={88} />
          </WriteButton>
        ) : (
          <WriteButton>
            <img onClick={onClickWrite} src={IMAGES.icon_write_gr} width={88} />
          </WriteButton>
        )
      ) : null}
    </AppContainer>
  )
})

export default OthersContentTemplate

const AppContainer = styled.div`
  color: #ffffff;
  max-width: 500px;
  width: 100%;
  margin-top: 10px;
`
const MainContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 64px);
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
const ContentContainer = styled.div`
  margin-top: 10px;
`

const WriteButton = styled.button.attrs({ type: 'button' })`
  bottom: 0;
  right: 0;
  position: fixed;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 50px;
  backdrop-filter: blur(2px);

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

const TobeContinueContainer = styled.div`
  margin-top: 210px;
  font-size: 13px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.02em;
`

const EmptyContainer = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 40vh;
  font-size: 13px;
  line-height: 22px;
  /* or 169% */
  text-align: center;
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.7);
`
const TobeContinueTitle = styled.div`
  opacity: 0.3;
`
