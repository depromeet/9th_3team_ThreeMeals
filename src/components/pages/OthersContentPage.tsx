import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import { getAccountInfo, GET_ACCOUNT_INFO } from '../../lib/queries/userQueries'
import OthersContentTemplate from '../templates/OthersContentTemplate'
import {
  getPostParams,
  GET_POST,
  getPost,
} from '../../lib/queries/getPostQueries'
import {
  getUnreadNotiCount,
  GET_UNREAD_NOTI_COUNT,
} from '../../lib/queries/getQueries'
import jsCookies from 'js-cookie'

const OthersContentPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const token = jsCookies.get('token')
  const account = useQuery<getAccountInfo>(GET_ACCOUNT_INFO, {
    variables: { accountId: id },
  })
  const getPost = useQuery<getPost, getPostParams>(GET_POST, {
    variables: { first: 10, accountId: account.data?.getAccountInfo.id },
  })
  const getUnreadNotiCount = useQuery<getUnreadNotiCount>(GET_UNREAD_NOTI_COUNT)
  const onClickAnswerCard = useCallback(
    (postId) => {
      router.push({ pathname: '/answerDetail', query: { postId } })
    },
    [router]
  )

  useEffect(() => {
    getPost.refetch()
  }, [])

  return (
    <AppContainer>
      <OthersContentTemplate
        token={token}
        getPost={getPost.data}
        account={account.data}
        getUnreadNotiCount={getUnreadNotiCount.data?.getUnreadNotiCount.count}
        profileImage={IMAGES.background}
        onClickLeft={() => {
          router.push('/profile')
        }}
        onClickSecondRight={() => {
          router.push('/notification')
        }}
        onClickAnswerCard={onClickAnswerCard}
      />
    </AppContainer>
  )
}

export default OthersContentPage

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
