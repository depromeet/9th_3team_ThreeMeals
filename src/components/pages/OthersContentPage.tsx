import { useQuery, useReactiveVar } from '@apollo/client'
import { useRouter } from 'next/router'
import React, {
  Dispatch,
  Ref,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
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
import { getMyAccountInfo, GET_MY_PROFILE } from '../../lib/queries/meQueries'
import { updateCurTabIdx } from '../../lib/localStore/contentTabIndex'
import { curTabIdx } from '../../lib/localStore/contentTabIndex'
import checkCurPostType from '../../utils/checkCurPostType'
import useIntersect from '../../hooks/useIntersect'

const OthersContentPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const token = jsCookies.get('token')
  const [lastPostId, setLastPostId] = useState<undefined | string>()
  const [getPostFirstCnt, setGetPostFirstCnt] = useState(10)
  const [stopFetchMore, setStopFetchMore] = useState(false)
  const currentTabIdx = useReactiveVar(curTabIdx)
  const curPostType = checkCurPostType(currentTabIdx)
  const myAccount = useQuery<getMyAccountInfo>(GET_MY_PROFILE)
  const account = useQuery<getAccountInfo>(GET_ACCOUNT_INFO, {
    variables: { accountId: id },
  })
  const getPost = useQuery<getPost, getPostParams>(GET_POST, {
    variables: {
      first: getPostFirstCnt,
      accountId: account.data?.getAccountInfo.id,
      postType: curPostType,
      // postState: 'Completed',
    },
    onCompleted: (data) => {
      setLastPostId(data.getPosts.pageInfo.endCursor)
    },
  })
  const [_, setIntersectRef] = useIntersect({
    onIntersect: async (entry, observer) => {
      observer.unobserve(entry.target)
      const getPostData = await getPost.refetch({
        first: getPostFirstCnt + 10,
        accountId: account.data?.getAccountInfo.id,
        postType: curPostType,
        // postState: 'Completed',
      })
      if (lastPostId === getPostData.data.getPosts.pageInfo.endCursor) {
        setStopFetchMore(true)
      } else {
        await new Promise((_) => {
          setLastPostId(getPostData.data.getPosts.pageInfo.endCursor)
          setGetPostFirstCnt(getPostFirstCnt + 10)
        })
        observer.observe(entry.target)
      }
    },
    option: { threshold: 0.2 },
    stopFetchMore,
  })
  const getUnreadNotiCount = useQuery<getUnreadNotiCount>(GET_UNREAD_NOTI_COUNT)
  const onClickAnswerCard = useCallback(
    (postId) => {
      router.push({ pathname: '/answerDetail', query: { postId } })
    },
    [router]
  )
  const onClickTabIndex = useCallback(async (index: number) => {
    updateCurTabIdx(index)
  }, [])
  useEffect(() => {
    getPost.refetch({
      first: 10,
      accountId: account.data?.getAccountInfo.id,
      postType: curPostType,
      // postState: 'Completed',
    })
    setStopFetchMore(false)
    setGetPostFirstCnt(10)
  }, [currentTabIdx, curPostType])
  return (
    <>
      <AppContainer>
        <OthersContentTemplate
          myAccount={myAccount.data}
          token={token}
          getPost={getPost.data}
          account={account.data}
          getUnreadNotiCount={getUnreadNotiCount.data?.getUnreadNotiCount.count}
          profileImage={IMAGES.background}
          onClickSecondRight={() => {
            router.push('/notification')
          }}
          onClickAnswerCard={onClickAnswerCard}
          onClickTabIndex={onClickTabIndex}
          ref={
            setIntersectRef as Ref<
              Dispatch<SetStateAction<RefObject<HTMLDivElement | null> | null>>
            >
          }
        />
      </AppContainer>
    </>
  )
}

export default OthersContentPage

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
