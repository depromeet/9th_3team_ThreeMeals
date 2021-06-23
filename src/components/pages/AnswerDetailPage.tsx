import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import Modal from '../molecules/Modal'
import AnswerDetailTemplate from '../templates/AnswerDetailTemplate'
import {
  ParentComments,
  GET_PARENT_COMMENTS,
  ChildrenComments,
  GET_CHILDREN_COMMENTS,
} from '../../lib/queries/getCommentsQueries'
import { useQuery, useMutation } from '@apollo/client'
import {
  CreateCommentRes,
  CreateCommentParams,
  CREATE_COMMENT,
} from '../../lib/queries/createQueries'

export type AnswerContactType = 'parent' | 'children' | 'grandChildren'

const AnswerDetailPage: React.FC = () => {
  const router = useRouter()
  const { postId, isMine: queryIsMine } = router.query
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>()
  const [curCommentId, setCurCommentId] = useState('')
  const parentCommentsData = useQuery<ParentComments>(GET_PARENT_COMMENTS, {
    variables: { first: 10, postId: postId },
  })
  const childrenCommentsData = useQuery<ChildrenComments>(
    GET_CHILDREN_COMMENTS,
    {
      variables: { first: 10, postId: postId, parentId: curCommentId },
    }
  )
  const [createCommentMutation] =
    useMutation<CreateCommentRes, CreateCommentParams>(CREATE_COMMENT)
  const onSendComment = useCallback(
    (comment: string) => {
      if (typeof postId === 'string') {
        if (curCommentId) {
          createCommentMutation({
            variables: {
              postId: postId,
              parentId: curCommentId,
              content: comment,
              secretType: 'Forever',
            },
          }).then(() => {
            childrenCommentsData.refetch()
            parentCommentsData.refetch()
          })
        } else {
          createCommentMutation({
            variables: {
              postId: postId,
              content: comment,
              secretType: 'Forever',
            },
          }).then(() => {
            parentCommentsData.refetch()
          })
        }
      }
    },
    [
      childrenCommentsData,
      createCommentMutation,
      curCommentId,
      parentCommentsData,
      postId,
    ]
  )

  const onClickRemove = useCallback((type: AnswerContactType, id: string) => {
    const modalData: string =
      type === 'parent'
        ? '이 질문을 삭제하시겠습니까?'
        : type === 'children'
        ? '이 댓글을 삭제하시겠습니까?'
        : '이 답글을 삭제하시겠습니까?'
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
  const setParentCommentId = (commentId: string) => {
    setCurCommentId(commentId)
  }
  console.log(parentCommentsData, 'curComId:', curCommentId)
  return (
    <AppContainer>
      <AnswerDetailTemplate
        onClickLeft={router.back}
        onClickRight={router.back}
        onSendComment={onSendComment}
        onClickRemove={onClickRemove}
        isMine={isMine}
        parentComments={parentCommentsData.data}
        setParentCommentId={setParentCommentId}
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
