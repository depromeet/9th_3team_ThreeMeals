import React, { VFC, useEffect } from 'react'
import AnswerNewOXTemplate from '../templates/AnswerNewOXTemplate'
import { useRouter } from 'next/router'
import { BackColor } from '../../types/types'
import { addQuizData } from '../../lib/localStore/quizAnswer'

const dummyCardData = [
  { id: 0, content: '1 김덕배님은 남자친구가 있으신지요 ???' },
  { id: 1, content: '2 초록매실이 좋으면 o 보리차가 좋으면 x' },
  { id: 2, content: '3 김덕배님은 남자친구가 있으신지 ???' },
  { id: 3, content: '4 초록매실이 좋으면 o 보리차가 좋으면 x' },
  { id: 4, content: '5 김덕배님은 남자친구가 있지요 ???' },
]
const dummyCardColors: BackColor[] = [
  '#FF823D',
  '#6799FE',
  '#67D585',
  '#6799FE',
  '#FF823D',
]

const AnswerNewOXPage: VFC = () => {
  const router = useRouter()
  useEffect(() => {
    addQuizData(dummyCardData)
  }, [])
  return (
    <>
      <AnswerNewOXTemplate
        onClickHeaderLeft={router.back}
        cardData={dummyCardData}
        backColors={dummyCardColors}
      />
    </>
  )
}

export default AnswerNewOXPage
