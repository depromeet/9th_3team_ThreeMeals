import React, { useState, FC } from 'react'
import { useSprings } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import QuizCard from '../molecules/QuizCard'
import { CardHeaderProps } from '../molecules/QuizCardHeader'
import { SVGS } from '../../constants/svgs'
import styled from 'styled-components'
import { BackColor } from '../../types/types'

interface Props {
  data: Array<string>
  cardHeader?: CardHeaderProps
  backColors: Array<BackColor>
}

const toD = (i: number) => ({
  x: 0,
  y: i,
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
  const [gone] = useState(() => new Set())
  const [props, set] = useSprings(deckProps.data.length, (i) => ({
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
          console.log('request query(type: each answer data) value:', dir)
        }
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        }
      })
      if (!down && gone.size === deckProps.data.length) {
        setTimeout(() => {
          if (dir === -1) {
            gone.clear(), set((i) => toD(i))
          } else {
            alert('제출 완료 : request query(type:answers data in userData)')
          }
        }, 600)
      }
    }
  )
  return (
    <>
      <SkipCardHandlerContainer>
        <img
          src={SVGS.icon_24_prev_wh}
          alt="prevIcon"
          onClick={props.handleSkippingToPrev}
        />
        <span>1/{props.cardData.length}</span>
        <img
          src={SVGS.icon_24_next_wh}
          alt="nextIcon"
          onClick={props.handleSkippingToNext}
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
          {deckProps.data[i]}
        </QuizCard>
      ))}
    </>
  )
}

export default QuizDeck

const SkipCardHandlerContainer = styled.div`
  display: flex;
`
