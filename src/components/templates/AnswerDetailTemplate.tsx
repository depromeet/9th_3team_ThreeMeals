import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import DefaultInput from '../atoms/DefaultInput'
import Header from '../molecules/Header'
import PostComment from '../molecules/PostComment'
import AnswerCard from '../organisms/AnswerCard'
import { AnswerContactType } from '../pages/AnswerDetailPage'
import { ParentComments } from '../../lib/queries/getCommentsQueries'

interface Props {
  parentComments: ParentComments | undefined
  isMine: boolean
  onClickLeft?: () => void
  onClickRight?: () => void
  onSendComment: (comment: string) => void
  onClickRemove?: (type: AnswerContactType, id: string) => void
  setParentCommentId: (commentId: string) => void
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
  const onSubmitPostImg = useCallback(
    (e) => {
      e.preventDefault()
      props.onSendComment(comment)
      setComment('')
    },
    [comment, props]
  )
  return (
    <Container>
      <Header
        leftIcon={IMAGES.icon_24_back_wh}
        onClickLeft={props.onClickLeft}
      />
      <AnswerCard
        questionTitle="김덕배님 남자친구는 있으신지요 ????"
        backColor={'#67D585'}
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
          setParentCommentId={props.setParentCommentId}
        />
      </PostContainer>
      <BottomContainer style={{ paddingBottom: 30 }}>
        <InputContainer onSubmit={onSubmitPostImg}>
          <DefaultInput
            placeholder="댓글을 입력하세요."
            onChange={(e) => setComment(e)}
            onFocus={onFocus}
            onBlur={onBlur}
            containerStyle={{ width: isFocus ? '80%' : '85%', height: '100%' }}
            value={comment}
          />
          <Postimg
            src={IMAGES.inputSend}
            onClick={onSubmitPostImg}
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
const InputContainer = styled.form`
  height: 78px;
  margin-left: 5%;
  padding-bottom: 30px;
  display: flex;
  width: 100%;
  margin: 15px 5% 0 5%;
  max-width: 396px;
`
