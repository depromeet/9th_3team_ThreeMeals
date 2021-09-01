import React, { VFC, useEffect } from 'react'
import AnswerNewOXTemplate from '../templates/AnswerNewOXTemplate'
import { useRouter } from 'next/router'
import { addQuizData } from '../../lib/localStore/quizAnswer'
import { useQuery } from '@apollo/client'
import {
  getPostParams,
  GET_POST,
  getPost,
} from '../../lib/queries/getPostQueries'
import { getMyAccountInfo, GET_MY_PROFILE } from '../../lib/queries/meQueries'
import { updateCurTabIdx } from '../../lib/localStore/contentTabIndex'

const AnswerNewOXPage: VFC = () => {
  const router = useRouter()
  const myAccount = useQuery<getMyAccountInfo>(GET_MY_PROFILE)
  const { data: postData } = useQuery<getPost, getPostParams>(GET_POST, {
    variables: { first: 10, accountId: myAccount.data?.getMyAccountInfo.id },
  })
  const quizPostData = postData?.getPosts.edges.filter(
    (content) =>
      content.node.postType === 'Quiz' && content.node.comments.length === 0
  )
  const cardData = quizPostData?.map((content) => {
    return {
      id: content.node.id,
      content: content.node.content,
      commentId: content.node.comments[0]?.id,
    }
  })
  const cardDataColors = quizPostData?.map((content) => {
    return content.node.color
  })
  useEffect(() => {
    if (cardData) {
      addQuizData(cardData)
    }
  }, [cardData])
  useEffect(() => {
    updateCurTabIdx(2)
  }, [])
  if (!cardData || !cardDataColors) {
    return <></>
  }
  return (
    <>
      <AnswerNewOXTemplate
        onClickHeaderLeft={router.back}
        cardData={cardData}
        backColors={cardDataColors}
      />
    </>
  )
}

export default AnswerNewOXPage
