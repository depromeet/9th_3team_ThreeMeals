import React, { useState, FC, useEffect, useCallback } from 'react'
import { useSprings } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import QuizCard from '../molecules/QuizCard'
import { CardHeaderProps } from '../molecules/QuizCardHeader'
import { BackColor } from '../../types/types'
import { SVGS } from '../../constants/svgs'
import styled from 'styled-components'
import { useReactiveVar } from '@apollo/client'
import handleQuizDataVar, {
  handleQuizData,
} from '../../lib/localStore/quizAnswer'
import { Router, useRouter } from 'next/router'

interface Props {
  cardHeader?: CardHeaderProps
  cardData: Array<{ id: number; content: string }>
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
  const quizData = useReactiveVar(handleQuizDataVar)
  const [renderQuizData, setRenderQuizData] = useState(false)
  const [curQuizDataId, setCurQuizDataId] = useState<number>(0)
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
          setCurQuizDataId(curQuizDataId - 1)
          console.log('request query(type: each answer data) value:', dir)
          gone.delete(index)
          setTimeout(() => {
            handleQuizData(curQuizDataId)
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
    handleQuizData(curQuizDataId, deckProps.cardData[curQuizDataId + 1])
    setCurQuizDataId(curQuizDataId + 1)
  }, [curQuizDataId, deckProps.cardData])
  const handleToNext = useCallback(() => {
    handleQuizData(curQuizDataId)
    setCurQuizDataId(curQuizDataId - 1)
  }, [curQuizDataId])
  useEffect(() => {
    if (quizData && renderQuizData) {
      setCurQuizDataId(quizData.length - 1)
      setRenderQuizData(false)
    }
  }, [quizData, renderQuizData])
  useEffect(() => {
    setRenderQuizData(true)
  }, [])
  useEffect(() => {
    setTimeout(() => {
      if (quizData.length === 0 && curQuizDataId === -1) {
        alert('제출 완료 : request query(type:answers data in userData)')
        router.back()
      }
    }, 500)
  }, [curQuizDataId, quizData.length, router])
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
