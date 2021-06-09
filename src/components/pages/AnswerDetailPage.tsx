import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import Modal from '../molecules/Modal'
import AnswerDetailTemplate from '../templates/AnswerDetailTemplate'
import { ParentComments } from '../../lib/queries/getCommentsQueries'

export type AnswerContactType = 'parent' | 'children'
interface Props {
  data: ParentComments
}

const AnswerDetailPage: React.FC<Props> = (props) => {
  const router = useRouter()
  const { isMine: queryIsMine } = router.query
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>()
  const onSendComment = useCallback((comment: string) => {
    console.log('comment:', comment)
  }, [])

  const onClickRemove = useCallback((type: AnswerContactType, id: string) => {
    const modalData: string =
      type === 'parent'
        ? '이 질문을 삭제하시겠습니까?'
        : '이 댓글을 삭제하시겠습니까?'

    setModalTitle(modalData)
    setIsOpen(true)
  }, [])

  const isMine = useMemo((): boolean => {
    /** Check 내피드 or 타인피드
     * 내피드 - 좋아요 / 답글보기 / 옵션 노출 > true
     * 타인피드 - 좋아요 / 답글보기 / 옵션 미 노출 > false
     */
    if (queryIsMine) {
      return true
    }
    return false
  }, [queryIsMine])

  return (
    <AppContainer>
      <AnswerDetailTemplate
        onClickLeft={router.back}
        onClickRight={router.back}
        onSendComment={onSendComment}
        onClickRemove={onClickRemove}
        isMine={isMine}
        parentComments={props.data}
      />
      <Modal
        open={isOpen}
        title={modalTitle || ''}
        titleEmojiTextType="💬"
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
