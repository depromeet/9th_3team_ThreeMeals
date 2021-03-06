import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import NewSecretCardTemplate from '../templates/NewSecretCardTemplate'
import Modal from '../molecules/Modal'
import { getMyAccountInfo, GET_MY_PROFILE } from '../../lib/queries/meQueries'
import { useMutation, useQuery } from '@apollo/client'
import {
  getMyNewPostCount,
  getMyNewPostCountParams,
  getPost,
  getPostParams,
  GET_POST,
  GET_MY_NEW_POST_COUNT,
} from '../../lib/queries/getPostQueries'
import {
  CREATE_COMMENT_ASK,
  CreateCommentAskResponse,
  CreateCommentAskParams,
} from '../../lib/queries/createCommentQueries'
import { updateCurTabIdx } from '../../lib/localStore/contentTabIndex'
const NewSecretCardPage: React.FC = () => {
  const router = useRouter()
  const myAccount = useQuery<getMyAccountInfo>(GET_MY_PROFILE)
  const getPost = useQuery<getPost, getPostParams>(GET_POST, {
    variables: {
      first: 20,
      accountId: myAccount.data?.getMyAccountInfo.id,
      postState: 'Submitted',
      postType: 'Ask',
    },
  })

  const getMyNewPostCount = useQuery<
    getMyNewPostCount,
    getMyNewPostCountParams
  >(GET_MY_NEW_POST_COUNT, {
    variables: { postType: 'Ask', postState: 'Submitted' },
  })

  const [create_comment] =
    useMutation<CreateCommentAskResponse, CreateCommentAskParams>(
      CREATE_COMMENT_ASK
    )

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const newPostCount = useMemo(() => {
    if (getMyNewPostCount.data) {
      return getMyNewPostCount.data?.getMyNewPostCount.postCount[0].count
    } else {
      return 0
    }
  }, [getMyNewPostCount])

  const onClickSend = useCallback(
    async (text: string, postId: string, secretType: string) => {
      if (text.length > 0) {
        try {
          await create_comment({
            variables: {
              postId: postId,
              content: text,
              secretType: secretType,
            },
          })
          router.replace('/content')
        } catch (error) {
          window.alert(`??????????????? ??????????????????.\n${error}`)
        }
      } else {
        window.alert('????????? ??????????????????. :)')
      }
    },
    [create_comment, router]
  )

  const onClickRemove = useCallback((id: string) => {
    setIsOpen(true)
  }, [])

  const onClickLike = useCallback((id: string) => {}, [])
  useEffect(() => {
    updateCurTabIdx(0)
  }, [])

  return (
    <AppContainer>
      <NewSecretCardTemplate
        newPostCount={newPostCount}
        getPost={getPost.data}
        myAccount={myAccount.data}
        profileImage={IMAGES.background}
        onClickSend={onClickSend}
        onClickLeft={router.back}
        onClickRemove={onClickRemove}
        onClickLike={onClickLike}
      />
      <Modal
        open={isOpen}
        title={'???? ??? ????????? ?????????????????????????'}
        confirmText={'????????????'}
        cancelText={'??????'}
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

export default NewSecretCardPage

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
