import React, { FC, useMemo } from 'react'
import Header from '../molecules/Header'
import { IMAGES } from '../../constants/images'
import styled from 'styled-components'
import QuestionCard from '../organisms/QuestionCard'
import PrivateCardLabel from '../atoms/PrivateCardLabel'
import { getMyAccountInfo } from '../../lib/queries/meQueries'
import { getPost } from '../../lib/queries/getPostQueries'
import CardLabel from '../atoms/CardLabel'
interface Props {
  newPostCount: number
  getPost?: getPost
  profileImage?: string
  isFinish?: boolean
  myAccount?: getMyAccountInfo
  onClickLeft?: () => void
  onClickSend: (text: string, postId: string, secretType: string) => void
  onClickRemove: (id: string) => void
  onClickLike: (id: string) => void
}

const NewSecretCardTemplate: FC<Props> = (props) => {
  const profileImage = useMemo(() => {
    return props.myAccount?.getMyAccountInfo.image
  }, [props.myAccount?.getMyAccountInfo.image])

  const ask = useMemo(() => {
    if (props.getPost?.getPosts.edges) {
      const edges = props.getPost?.getPosts.edges
      const ask = edges?.filter(
        (e) => e.node.postType === 'Ask' && e.node.comments.length === 0
      )
      return ask
    }
  }, [props.getPost?.getPosts.edges])

  return (
    <AppContainer>
      <Header
        isLogin={props.myAccount ? true : false}
        profileImage={profileImage}
        leftIcon={IMAGES.icon_24_back_wh}
        rightIcon={IMAGES.icon_24_drawer}
        onClickLeft={props.onClickLeft}
      />
      <MainContainer>
        <CardCountText>{`${
          props.newPostCount || 0
        }개의 비밀카드 도착`}</CardCountText>
        <ContentContainer>
          {ask?.map((data, index) => {
            return (
              <QuestionCard
                key={index}
                isInput
                onClickSend={props.onClickSend}
                id={data.node.id}
                secretType={data.node.secretType}
                labelComponent={
                  data.node.secretType === 'Forever' ? (
                    <PrivateCardLabel text="BONG IN" active={false} />
                  ) : (
                    <CardLabel text={data.node.createdAt} active />
                  )
                }
                questionTitle={data.node.content}
                backColor={'#FF833D'}
                stickers={data.node.usedEmoticons}
                comments={data.node.comments}
                onClickOption={() => {
                  props.onClickRemove(data.node.id)
                }}
                onClickLike={() => {
                  props.onClickLike(data.node.id)
                }}
              />
            )
          })}
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
