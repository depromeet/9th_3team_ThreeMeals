import React, { useState } from 'react'
import { useSprings, animated, to } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import styled from 'styled-components'
// import { UserHandlers, NativeHandlers } from 'react-use-gesture/dist/types'
// interface TransProps {
//     r:number;
//     s:number;
// }
// interface GestureProps {
//
// }
const ContextContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  & :nth-child(1) {
    width: 100%;
    height: 20%;
  }
  & :nth-child(2) {
    width: 100%;
    height: 50%;
    text-align: center;
  }
  & :nth-child(3) {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`

const dummyCardData = [
  '다시 제출하시겠습니까?',
  'you are singer?',
  'compose your self man',
  'are you freaking out?',
  'check out',
]
const toD = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: 0,
  delay: i * 100,
})
const from = (i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
const trans = (r: number, s: number) =>
  `perspective(2000px) rotateX(10deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`
function QuizCard() {
  const [gone] = useState(() => new Set())
  const [props, set] = useSprings(dummyCardData.length, (i) => ({
    ...toD(i),
    from: from(i),
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
      if (!down && gone.size === dummyCardData.length) {
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
      {propsData.map(({ x, y, rot, scale }, i) => (
        <animated.div
          key={i}
          style={{
            transform: to([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`),
            width: '100vw',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            willChange: 'transform',
          }}
        >
          <animated.div
            {...bind(i)}
            style={{
              transform: to([rot, scale], trans),
              backgroundImage: `url('/Rectangle.png')`,
              height: '400px',
              width: '400px',
              cursor: 'pointer',
              willChange: 'transform',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ContextContainer>
              <div></div>
              <div>{dummyCardData[i]}</div>{' '}
              <div>
                <img
                  src="/leftArrowCircle.png"
                  alt="LArrow"
                  id="-1"
                  style={{ width: '30%' }}
                />
                <img
                  src="/rightArrowX.png"
                  alt="RArrow"
                  id="+1"
                  style={{ width: '30%' }}
                />
              </div>
            </ContextContainer>
          </animated.div>
        </animated.div>
      ))}
    </>
  )
}

export default QuizCard
