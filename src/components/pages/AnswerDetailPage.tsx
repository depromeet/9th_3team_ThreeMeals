import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import Modal from '../molecules/Modal'
import AnswerDetailTemplate from '../templates/AnswerDetailTemplate'

export type AnswerContactType = 'parent' | 'children'
const AnswerDetailPage: React.FC = () => {
  const router = useRouter()
  //   const { loading, error, data } = useQuery(GET_PARENT_COMMENTS, {
  //     variables: { first: 30, postId: '1' },
  //   })

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>()
  const onSendComment = useCallback((comment: string) => {
    console.log('comment:', comment)
  }, [])

  const onClickRemove = useCallback((type: AnswerContactType, id: string) => {
    const modalData: string =
      type === 'parent'
        ? '💬 이 질문을 삭제하시겠습니까?'
        : '💬 이 댓글을 삭제하시겠습니까?'

    setModalTitle(modalData)
    setIsOpen(true)
  }, [])

  return (
    <AppContainer>
      <AnswerDetailTemplate
        onClickLeft={router.back}
        onClickRight={router.back}
        onSendComment={onSendComment}
        onClickRemove={onClickRemove}
      />
      <Modal
        open={isOpen}
        title={modalTitle || ''}
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
