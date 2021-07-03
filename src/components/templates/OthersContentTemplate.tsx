import React, {
  FC,
  ReactElement,
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
import { getPost } from '../../lib/queries/getPostQueries'
import QuizAnswerCard from '../organisms/QuizAnswerCard'

interface Props {
  token?: string
  getPost?: getPost
  getUnreadNotiCount?: number
  account?: getAccountInfo
  profileImage: string
  onClickLeft?: () => void
  onClickAnswerCard: (postId: string) => void
  onClickSecondRight?: () => void
}

const OthersContentTemplate: FC<Props> = (props) => {
  const [tabIndex, setTabIndex] = useState<number>(0)
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
      if (tabIndex === 0) {
        router.push(
          `/writePost/Ask?otherId=${props.account?.getAccountInfo.id}`
        )
      } else {
        router.push(
          `/writePost/Quiz?otherId=${props.account?.getAccountInfo.id}`
        )
      }
    } else {
      window.alert('로그인을 해주세요.')
      router.push('/')
    }
  }, [props.account?.getAccountInfo.id, props.token, router, tabIndex])
  const ContentView = useMemo((): ReactElement | undefined => {
    switch (tabIndex) {
      case 0:
        return (
          <>
            <ContentContainer>
              {postContent?.ask.map((data, index) => {
                return (
                  <QuestionCard
                    key={index}
                    id={data.node.id}
                    createdAt={data.node.createdAt}
                    updatedAt={data.node.updatedAt}
                    secretType={data.node.secretType}
                    questionTitle={data.node.content}
                    backColor={data.node.color}
                    stickers={data.node.usedEmoticons}
                    comments={data.node.comments}
                  />
                )
              })}
            </ContentContainer>
          </>
        )
      case 1:
        return (
          <>
            <ContentContainer>
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
            </ContentContainer>
          </>
        )
      case 2:
        return (
          <>
            <ContentContainer>
              {postContent?.quiz.map((content, index) => {
                return content.node.comments &&
                  content.node.comments.length > 0 ? (
                  <QuizAnswerCardContainer key={index}>
                    <QuizAnswerCard
                      content={content.node.content}
                      backColor={content.node.color}
                      answerType={content.node.comments[0].content}
                      isMyFeed={false}
                      isLikeActive={content.node.likedPosts.length > 0}
                    />
                  </QuizAnswerCardContainer>
                ) : null
              })}
            </ContentContainer>
          </>
        )
      default:
        break
    }
  }, [props, tabIndex, postContent])

  const profileImage = useMemo(() => {
    return props.account?.getAccountInfo.image
  }, [props.account?.getAccountInfo.image])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowObjet(window)
    }
  }, [])

  return (
    <AppContainer>
      <Header
        isLogin={props.account ? true : false}
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
            props.account?.getAccountInfo.nickname || '닉네임을 입력해주세요.'
          }
          desc={props.account?.getAccountInfo.content || '소개를 입력해주세요.'}
          urlName="프로필"
          url={
            windowObjet !== undefined
              ? windowObjet.location.origin +
                '/otherscontent/' +
                props.account?.getAccountInfo.id
              : ''
          }
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
      {(postContent && tabIndex === 0) || (postContent && tabIndex === 2) ? (
        (tabIndex === 0 && postContent.ask.length > 1) ||
        (tabIndex === 2 && postContent.quiz.length > 1) ? (
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
