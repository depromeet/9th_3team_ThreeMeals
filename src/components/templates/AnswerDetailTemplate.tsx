import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import DefaultInput from '../atoms/DefaultInput'
import Header from '../molecules/Header'
import PostComment from '../molecules/PostComment'
import AnswerCard from '../organisms/AnswerCard'
import { AnswerContactType } from '../pages/AnswerDetailPage'
import { ParentComments } from '../../lib/queries/getCommentsQueries'
import { getPostById } from '../../lib/queries/getPostQueries'

interface Props {
  parentComments: ParentComments | undefined
  isMine: boolean
  postData?: getPostById
  onClickLeft?: () => void
  onClickRight?: () => void
  onSendComment: (comment: string) => void
  onClickRemove?: (type: AnswerContactType, id: string) => void
}

const AnswerDetailTemplate: React.FC<Props> = (props: Props) => {
  const [comment, setComment] = useState<string>('')
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const onFocus = useCallback(() => {
    setIsFocus(true)
  }, [])
  const onBlur = useCallback(() => {
    setTimeout(() => {
      setIsFocus(false)
    }, 1000)
  }, [])
  if (props.postData === undefined) {
    return <></>
  }

  return (
    <Container>
      <Header
        leftIcon={IMAGES.icon_24_back_wh}
        onClickLeft={props.onClickLeft}
      />
      <AnswerCard
        questionTitle={props.postData.getPost.content}
        backColor={props.postData.getPost.color}
        commentCount={props.parentComments?.getParentComments.edges.length}
        time={props.postData.getPost.createdAt}
        stickers={props.postData.getPost.usedEmoticons}
        onClickOption={
          props.isMine
            ? () => {
                props.onClickRemove && props.onClickRemove('parent', 'parentId')
              }
            : undefined
        }
      />
      <PostContainer>
        <PostComment
          isMine={props.isMine}
          profileImg={IMAGES.background}
          commentsInfo={props.parentComments}
          onClickRemove={props.onClickRemove}
        />
      </PostContainer>
      <BottomContainer style={{ paddingBottom: 30 }}>
        <InputContainer>
          <DefaultInput
            placeholder="댓글을 입력하세요."
            onChange={(e) => setComment(e)}
            onFocus={onFocus}
            onBlur={onBlur}
            containerStyle={{ width: isFocus ? '80%' : '85%', height: '100%' }}
          />
          <Postimg
            src={IMAGES.inputSend}
            onClick={(e) => {
              e.preventDefault()
              props.onSendComment(comment)
            }}
            style={{ visibility: isFocus ? 'initial' : 'hidden' }}
          />
        </InputContainer>
      </BottomContainer>
    </Container>
  )
}

export default AnswerDetailTemplate

const Container = styled.div`
  max-width: 500px;
  width: 100%;
`

const PostContainer = styled.div`
  display: flex;
  justify-content: center;
`
const Postimg = styled.img`
  width: 48px;
  height: 48px;
  position: relative;
  left: 10px;
`

const BottomContainer = styled.div`
  display: flex;
  justify-content: center;
`
const InputContainer = styled.div`
  height: 78px;
  margin-left: 5%;
  padding-bottom: 30px;
  display: flex;
  width: 100%;
  margin: 15px 5% 0 5%;
  max-width: 396px;
`
