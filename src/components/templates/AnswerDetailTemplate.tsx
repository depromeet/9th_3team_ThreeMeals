import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import {
  dummyChildrenCommentData,
  dummyCommentData,
} from '../../stories/molecules/PostComment.stories'
import DefaultInput from '../atoms/DefaultInput'
import Header from '../molecules/Header'
import PostComment from '../molecules/PostComment'
import AnswerCard from '../organisms/AnswerCard'
import { CardColor } from '../organisms/QuestionCard'

interface Props {
  onClickLeft?: () => void
  onClickRight?: () => void
  onSendComment: (comment: string) => void
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
  return (
    <Container>
      <Header
        leftIcon={IMAGES.icon_24_back_wh}
        onClickLeft={props.onClickLeft}
      />

      <AnswerCard
        questionTitle="김덕배님 남자친구는 있으신지요 ????"
        backColor={CardColor.green}
      />
      <PostContainer>
        <PostComment
          profileImg={IMAGES.background}
          commentsInfo={dummyCommentData}
          childrenCommentInfo={dummyChildrenCommentData}
        />
      </PostContainer>
      <div style={{ paddingBottom: 30 }}>
        <InputContainer>
          <DefaultInput
            placeholder="댓글을 입력하세요."
            onChange={(e) => setComment(e)}
            onFocus={onFocus}
            onBlur={onBlur}
            containerStyle={{ width: isFocus ? '74%' : '85%', height: '100%' }}
          />
          <Postimg
            src={IMAGES.inputSend}
            onClick={() => {
              props.onSendComment(comment)
            }}
            style={{ visibility: isFocus ? 'initial' : 'hidden' }}
          />
        </InputContainer>
      </div>
    </Container>
  )
}

export default AnswerDetailTemplate

const Container = styled.div`
  max-width: 500px;
  width: 100%;
`
const InputContainer = styled.div`
  height: 78px;
  margin-left: 10%;
  padding-bottom: 30px;
`

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const Postimg = styled.img`
  width: 48px;
  height: 48px;
  position: relative;
  top: 20px;
  left: 10px;
`
