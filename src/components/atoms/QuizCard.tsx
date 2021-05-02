import React, { FC, PropsWithChildren } from 'react'
import styled from 'styled-components'
import { animated, to, SpringValue } from 'react-spring'
import { Vector2, ReactEventHandlers } from 'react-use-gesture/dist/types'
import { IMAGES } from '../../constants/images'
interface DragEventProps {
  args: Array<number>
  down: boolean
  movement: Vector2
  direction: Vector2
  velocity: number
}

interface Props {
  bind: (...args: DragEventProps[] | [number]) => ReactEventHandlers
  rot: SpringValue<number>
  scale: SpringValue<number>
  trans: (r: number, s: number) => string
  i: number
  x: SpringValue<number>
  y: SpringValue<number>
}
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
const QuizCard: FC<PropsWithChildren<Props>> = (props) => {
  return (
    <animated.div
      key={props.i}
      style={{
        transform: to(
          [props.x, props.y],
          (x, y) => `translate3d(${x}px,${y}px,0)`
        ),
        width: '100vw',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        willChange: 'transform',
      }}
    >
      <animated.div
        {...props.bind(props.i)}
        style={{
          transform: to([props.rot, props.scale], props.trans),
          backgroundColor: '#FF833D',
          height: '360px',
          width: '327px',
          cursor: 'pointer',
          willChange: 'transform',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '24px',
          boxShadow: '0px 30px 40px rgba(255, 131, 61, 0.15)',
        }}
      >
        <ContextContainer>
          <div></div>
          <div>{props.children}</div>{' '}
          <div>
            <img
              src={IMAGES.leftCircleArrow}
              alt="LArrow"
              id="-1"
              style={{ width: '30%' }}
            />
            <img
              src={IMAGES.rightXArrow}
              alt="RArrow"
              id="+1"
              style={{ width: '30%' }}
            />
          </div>
        </ContextContainer>
      </animated.div>
    </animated.div>
  )
}

export default QuizCard
