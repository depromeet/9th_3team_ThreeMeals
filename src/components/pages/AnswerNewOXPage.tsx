import React, { VFC } from 'react'
import AnswerNewOXTemplate from '../templates/AnswerNewOXTemplate'
import { useRouter } from 'next/router'
import { BackColor } from '../../types/types'

const dummyCardData = [
  '김덕배님은 남자친구가 있으신지요 ???',
  '초록매실이 좋으면 o 보리차가 좋으면 x',
  '김덕배님은 남자친구가 있으신지요 ???',
  '초록매실이 좋으면 o 보리차가 좋으면 x',
  '김덕배님은 남자친구가 있으신지요 ???',
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
