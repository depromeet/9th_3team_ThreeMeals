import React, { useState, FC, useEffect, useCallback } from 'react'
import { useSprings } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import QuizCard from '../molecules/QuizCard'
import { CardHeaderProps } from '../molecules/QuizCardHeader'
import { BackColor } from '../../types/types'
import { SVGS } from '../../constants/svgs'
import styled from 'styled-components'
import { useReactiveVar, useMutation, useQuery } from '@apollo/client'
import handleQuizDataVar, {
  handleQuizData,
} from '../../lib/localStore/quizAnswer'
import { useRouter } from 'next/router'
import {
  getPost,
  getPostParams,
  GET_POST,
} from '../../lib/queries/getPostQueries'
import {
  CreateCommentRes,
  CreateCommentParams,
  CREATE_COMMENT,
} from '../../lib/queries/createQueries'
import {
  deleteCommentResponse,
  deleteCommentParams,
  DELETE_COMMENT,
} from '../../lib/queries/deleteQueries'
import { getMyAccountInfo, GET_MY_PROFILE } from '../../lib/queries/meQueries'

interface Props {
  cardHeader?: CardHeaderProps
  cardData: Array<{ id: string; content: string; commentId: string }>
  backColors: BackColor[]
}

const toD = (i: number) => ({
  x: 0,
  y: 0,
  scale: 1,
  rot: 0,
  delay: i * 100,
})
const from = () => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
const trans = (r: number, s: number) =>
  `perspective(2000px) rotateX(10deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`
const QuizDeck: FC<Props> = (deckProps) => {
  const router = useRouter()
  const myAccount = useQuery<getMyAccountInfo>(GET_MY_PROFILE)
  const getPost = useQuery<getPost, getPostParams>(GET_POST, {
    variables: { first: 10, accountId: myAccount.data?.getMyAccountInfo.id },
  })
  const [createCommentMutation] =
    useMutation<CreateCommentRes, CreateCommentParams>(CREATE_COMMENT)
  const [deleteCommentMutation] = useMutation<
    deleteCommentResponse,
    deleteCommentParams
  >(DELETE_COMMENT, {
    onCompleted: () => {
      getPost.refetch()
    },
  })
  const quizData = useReactiveVar(handleQuizDataVar)
  const [renderQuizData, setRenderQuizData] = useState(false)
  const [curQuizDataCnt, setCurQuizDataCnt] = useState<number>(0)
  const [gone] = useState(() => new Set())
  const [props, set] = useSprings(quizData.length, (i) => ({
    ...toD(i),
    from: from(),
  }))
  const propsData = props
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2
      const dir = xDir < 0 ? -1 : 1
      if (!down && trigger) gone.add(index)
      set((i) => {
        if (index !== i) return
        const isGone = gone.has(index)
        const x = isGone ? (300 + window.innerWidth) * dir : down ? mx : 0
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0)
        const scale = down ? 1.1 : 1
        if (isGone) {
          setCurQuizDataCnt(curQuizDataCnt - 1)
          gone.delete(index)
          if (dir === 1) {
            createCommentMutation({
              variables: {
                postId: quizData[quizData.length - 1].id,
                content: 'X',
                secretType: 'Forever',
              },
            })
          } else {
            createCommentMutation({
              variables: {
                postId: quizData[quizData.length - 1].id,
                content: 'O',
                secretType: 'Forever',
              },
            })
          }
          setTimeout(() => {
            handleQuizData()
          }, 100)
        }
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
          velocity: 0,
        }
      })
    }
  )
  const handleToPrev = useCallback(() => {
    handleQuizData(deckProps.cardData[curQuizDataCnt + 1])
    setCurQuizDataCnt(curQuizDataCnt + 1)
    deleteCommentMutation({
      variables: {
        commentId: deckProps.cardData[curQuizDataCnt + 1].commentId,
      },
    })
  }, [curQuizDataCnt, deckProps.cardData, deleteCommentMutation])
  const handleToNext = useCallback(() => {
    handleQuizData()
    setCurQuizDataCnt(curQuizDataCnt - 1)
  }, [curQuizDataCnt])
  useEffect(() => {
    if (quizData && renderQuizData) {
      setCurQuizDataCnt(quizData.length - 1)
      setRenderQuizData(false)
    }
  }, [quizData, renderQuizData])
  useEffect(() => {
    setRenderQuizData(true)
  }, [])
  useEffect(() => {
    setTimeout(() => {
      if (quizData.length === 0 && curQuizDataCnt === -1) {
        alert('제출 완료')
        router.back()
      }
    }, 500)
  }, [curQuizDataCnt, quizData.length, router])
  return (
    <>
      <SkipCardHandlerContainer>
        {quizData.length !== deckProps.cardData?.length ? (
          <img
            src={SVGS.icon_24_prev_wh}
            alt="prevIcon"
            onClick={handleToPrev}
            className="left"
          />
        ) : (
          <div className="leftEmpty"></div>
        )}
        <span>
          {quizData.length}/{deckProps.cardData?.length}
        </span>
        <img
          src={SVGS.icon_24_next_wh}
          alt="nextIcon"
          onClick={handleToNext}
          className="right"
        />
      </SkipCardHandlerContainer>
      {propsData.map(({ x, y, rot, scale }, i) => (
        <QuizCard
          x={x}
          y={y}
          rot={rot}
          scale={scale}
          i={i}
          key={i}
          bind={bind}
          trans={trans}
          bottomHeight={27}
          backColor={deckProps.backColors[i]}
        >
          {quizData[i].content}
        </QuizCard>
      ))}
    </>
  )
}

export default React.memo(QuizDeck)

const SkipCardHandlerContainer = styled.div`
  display: flex;
  padding: 20px 0;
  justify-content: center;
  bottom: 230px;
  position: relative;
  color: white;
  align-items: center;
  font-size: 17px;
  margin-right: 10px;
  img {
    cursor: pointer;
  }
  .left {
    margin-right: 23px;
  }
  .leftEmpty {
    margin-right: 47px;
  }
  .right {
    margin-left: 23px;
  }
`
