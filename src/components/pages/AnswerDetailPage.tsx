import { useLazyQuery, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import {
  GET_CHILDREN_COMMENTS,
  GET_PARENT_COMMENTS,
} from '../../lib/queries/getQueries'
import Modal from '../molecules/Modal'
import AnswerDetailTemplate from '../templates/AnswerDetailTemplate'

const AnswerDetailPage: React.FC = () => {
  const router = useRouter()
  //   const { loading, error, data } = useQuery(GET_PARENT_COMMENTS, {
  //     variables: { first: 30, postId: '1' },
  //   })

  const [isOpen, setIsOpen] = useState<boolean>(true)
  const onSendComment = useCallback((comment: string) => {
    console.log('comment:', comment)
  }, [])
  console.log('router:', router.query)
  return (
    <AppContainer>
      <AnswerDetailTemplate
        onClickLeft={router.back}
        onClickRight={router.back}
        onSendComment={onSendComment}
      />
      <Modal
        open={isOpen}
        title={'💬 이 질문을 삭제하시겠습니까?'}
        confirmText={'삭제하기'}
        cancelText={'취소'}
        onClickConfirm={() => {
          console.log('onClickMOdal')
        }}
        onClickCancel={() => {
          setIsOpen(false)
        }}
      />
    </AppContainer>
  )
}

export default AnswerDetailPage

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
