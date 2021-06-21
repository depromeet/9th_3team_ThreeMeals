import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import ContentTemplate from '../templates/ContentTemplate'
import Modal from '../molecules/Modal'
import { getMyAccountInfo, GET_MY_PROFILE } from '../../lib/queries/meQueries'
import {
  deletePostParams,
  deletePostResponse,
} from '../../lib/queries/deleteQueries'
import { useMutation, useQuery } from '@apollo/client'
import {
  getMyNewPostCount,
  getMyNewPostCountParams,
  getPost,
  getPostParams,
  GET_MY_NEW_POST_COUNT,
  GET_POST,
} from '../../lib/queries/getPostQueries'
import {
  DELETE_POST,
  DELETE_LIKE,
  deleteLikeParams,
  deleteLikeRes,
} from '../../lib/queries/deleteQueries'
import {
  getUnreadNotiCount,
  GET_UNREAD_NOTI_COUNT,
} from '../../lib/queries/getQueries'
import {
  createLikeRes,
  createLikeParams,
  CREATE_LIKE,
} from '../../lib/queries/createQueries'

const ContentPage: React.FC = () => {
  const myAccount = useQuery<getMyAccountInfo>(GET_MY_PROFILE)
  const getPost = useQuery<getPost, getPostParams>(GET_POST, {
    variables: { first: 10, accountId: myAccount.data?.getMyAccountInfo.id },
  })

  const [createLike] = useMutation<createLikeRes, createLikeParams>(
    CREATE_LIKE,
    {
      onCompleted: () => {
        getPost.refetch()
      },
    }
  )
  const [deleteLike] = useMutation<deleteLikeRes, deleteLikeParams>(
    DELETE_LIKE,
    {
      onCompleted: () => {
        getPost.refetch()
      },
    }
  )
  const [deletePostMutation] = useMutation<
    deletePostResponse,
    deletePostParams
  >(DELETE_POST, {
    onCompleted: () => {
      getPost.refetch()
    },
  })
  const getMyNewPostCount = useQuery<
    getMyNewPostCount,
    getMyNewPostCountParams
  >(GET_MY_NEW_POST_COUNT, {
    variables: { postType: 'Ask' },
  })
  const getUnreadNotiCount = useQuery<getUnreadNotiCount>(GET_UNREAD_NOTI_COUNT)

  useEffect(() => {
    getPost.refetch()
  }, [])

  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [selectedPostId, setSelectedPostId] = useState<string>()
  const newPostCount = useMemo(() => {
    if (getMyNewPostCount.data) {
      return getMyNewPostCount.data?.getMyNewPostCount.postCount[0].count
    } else {
      return 0
    }
  }, [getMyNewPostCount])

  const onClickAnswerCard = useCallback(
    (postId, isMine) => {
      router.push({ pathname: '/answerDetail', query: { postId, isMine } })
    },
    [router]
  )
  const onClickWrite = useCallback(() => {
    router.push('/writePost/Answer')
  }, [router])

  const onClickRemove = useCallback((id: string) => {
    setSelectedPostId(id)
    setIsOpen(true)
  }, [])

  const onClickLike = useCallback(
    (id: string, isLikeActive: boolean) => {
      if (!isLikeActive) {
        createLike({ variables: { postId: id } })
      } else {
        deleteLike({ variables: { postId: id } })
      }
    },
    [createLike, deleteLike]
  )

  const onClickConfirmModal = useCallback(() => {
    if (selectedPostId) {
      deletePostMutation({
        variables: {
          postId: selectedPostId,
        },
      }).then(() => {
        setIsOpen(false)
      })
    }
  }, [deletePostMutation, selectedPostId])
  const onClickTabIndex = useCallback(
    async (index: number) => {
      setTabIndex(index)

      switch (index) {
        case 0:
          await getMyNewPostCount.refetch({ postType: 'Ask' })
          break
        case 1:
          await getMyNewPostCount.refetch({ postType: 'Answer' })
          break
        case 2:
          await getMyNewPostCount.refetch({ postType: 'Quiz' })
          break
        default:
          break
      }
    },
    [getMyNewPostCount]
  )

  return (
    <AppContainer>
      <ContentTemplate
        tabIndex={tabIndex}
        getUnreadNotiCount={getUnreadNotiCount.data?.getUnreadNotiCount.count}
        newPostCount={newPostCount}
        getPost={getPost.data}
        myAccount={myAccount.data}
        isProfile={true}
        profileImage={IMAGES.background}
        onClickTabIndex={onClickTabIndex}
        onClickLeft={() => {
          router.push('/profile')
        }}
        onClickSecondRight={() => {
          router.push('/notification')
        }}
        onClickNewSecretCard={(tabName: string) => {
          if (tabName === 'ask') {
            router.push('/newSecretCard')
          } else {
            if (newPostCount === 0) {
              return
            }
            router.push('/answerNewOX')
          }
        }}
        onClickAnswerCard={onClickAnswerCard}
        onClickWrite={onClickWrite}
        onClickRemove={onClickRemove}
        onClickLike={onClickLike}
      />
      <Modal
        open={isOpen}
        title={'이 질문을 삭제하시겠습니까?'}
        titleEmojiTextType="💬"
        confirmText={'삭제하기'}
        cancelText={'취소'}
        onClickConfirm={onClickConfirmModal}
        onClickCancel={() => {
          setIsOpen(false)
        }}
      />
    </AppContainer>
  )
}

export default ContentPage

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
