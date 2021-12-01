import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { useRouter } from 'next/router'
import React, {
  Dispatch,
  Ref,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
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
  getFavorites,
  getUnreadNotiCount,
  GET_FAVORITES,
  GET_UNREAD_NOTI_COUNT,
} from '../../lib/queries/getQueries'
import jsCookies from 'js-cookie'
import { getMyAccountInfo, GET_MY_PROFILE } from '../../lib/queries/meQueries'
import { updateCurTabIdx } from '../../lib/localStore/contentTabIndex'
import { curTabIdx } from '../../lib/localStore/contentTabIndex'
import checkCurPostType from '../../utils/checkCurPostType'
import useIntersect from '../../hooks/useIntersect'
import { linkedPostId } from '../../lib/localStore/notiLinkInfo'
import {
  CreateFavoriteParams,
  CreateFavoriteRes,
  CREATE_FAVORITE,
} from '../../lib/queries/createQueries'
import {
  CancelFavoriteRes,
  CancelFavoriteParams,
  CANCEL_FAVORITE,
} from '../../lib/queries/deleteQueries'

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
  const getUnreadNotiCount = useQuery<getUnreadNotiCount>(GET_UNREAD_NOTI_COUNT)
  const getPost = useQuery<getPost, getPostParams>(GET_POST, {
    variables: {
      first: getPostFirstCnt,
      accountId: account.data?.getAccountInfo.id,
      postType: curPostType,
      postState: 'Completed',
    },
    onCompleted: (data) => {
      setLastPostId(data.getPosts.pageInfo.endCursor)
    },
  })
  const getFavorite = useQuery<getFavorites>(GET_FAVORITES)

  const isFavoriteAccount = useMemo(() => {
    if (
      getFavorite.data?.getFavorites.find(
        (favoriteData) => favoriteData.favoriteAccount.id === id
      )
    )
      return true

    return false
  }, [getFavorite.data, id])

  const [createFavorite] = useMutation<CreateFavoriteRes, CreateFavoriteParams>(
    CREATE_FAVORITE,
    {
      onCompleted: () => {
        getFavorite.refetch()
      },
    }
  )

  const [cancelFavorite] = useMutation<CancelFavoriteRes, CancelFavoriteParams>(
    CANCEL_FAVORITE,
    {
      onCompleted: () => {
        getFavorite.refetch()
      },
    }
  )

  const onClickAnswerCard = useCallback(
    (postId) => {
      router.push({ pathname: '/answerDetail', query: { postId } })
    },
    [router]
  )
  const onClickTabIndex = useCallback(async (index: number) => {
    updateCurTabIdx(index)
  }, [])

  const onClickBookMark = useCallback(
    (isBookMarkActive: boolean | undefined) => {
      if (typeof id === 'string') {
        if (!isBookMarkActive) {
          createFavorite({ variables: { favoriteAccountId: id } })
        } else {
          cancelFavorite({ variables: { favoriteAccountId: id } })
        }
      }
    },
    [cancelFavorite, createFavorite, id]
  )

  /** intersection observer for infinite scroll */
  const [, setIntersectRef] = useIntersect({
    onIntersect: async (entry, observer) => {
      const getPostData = await getPost.fetchMore({
        variables: {
          first: getPostFirstCnt + 10,
          accountId: account.data?.getAccountInfo.id,
          postType: curPostType,
          postState: 'Completed',
        },
      })
      if (lastPostId === getPostData.data.getPosts.pageInfo.endCursor) {
        return setStopFetchMore(true)
      } else {
        setLastPostId(getPostData.data.getPosts.pageInfo.endCursor)
        setGetPostFirstCnt(getPostFirstCnt + 10)
      }
    },
    option: { threshold: 0.2 },
    stopFetchMore,
  })

  /** update getPost when changing tab */
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

  /** save otherAccount Id when not log in */
  useEffect(() => {
    if (!myAccount.data && id) {
      jsCookies.set('beginningRoutingToOtherId', id, { path: '/' })
    }
  }, [id, myAccount])
  useEffect(() => {
    if (myAccount.data && jsCookies.get('beginningRoutingToOtherId')) {
      jsCookies.remove('beginningRoutingToOtherId', { path: '/' })
    }
  }, [myAccount.data])

  /** refetch getPosts until find postId of linked notification content */
  useEffect(() => {
    if (linkedPostId() && getPost.data) {
      const linkedPost = getPost.data?.getPosts.edges.find(
        (postData) => postData.node.id === linkedPostId()
      )
      if (!linkedPost) {
        getPost
          .fetchMore({
            variables: {
              first: getPostFirstCnt + 10,
              accountId: account.data?.getAccountInfo.id,
              postType: curPostType,
              postState: 'Completed',
            },
          })
          .then((value) => {
            setLastPostId(value.data.getPosts.pageInfo.endCursor)
            setGetPostFirstCnt(getPostFirstCnt + 10)
          })
      }
    }
  }, [getPost.data])

  /** check whether curIdx is on bookmark */
  useEffect(() => {
    if (currentTabIdx === 3) {
      updateCurTabIdx(0)
    }
  }, [currentTabIdx])

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
          isFavoriteAccount={isFavoriteAccount}
          onClickSecondRight={() => {
            router.push('/notification')
          }}
          onClickAnswerCard={onClickAnswerCard}
          onClickTabIndex={onClickTabIndex}
          onClickBookMark={onClickBookMark}
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
