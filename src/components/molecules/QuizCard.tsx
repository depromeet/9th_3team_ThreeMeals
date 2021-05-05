import React, { FC, PropsWithChildren } from 'react'
import styled from 'styled-components'
import { animated, to, SpringValue } from 'react-spring'
import { Vector2, ReactEventHandlers } from 'react-use-gesture/dist/types'
import { IMAGES } from '../../constants/images'
import LabelCardHeader from './LabelCardHeader'
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
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
  .textArea {
    width: 100%;
    flex: 1;
    padding-top: 30px;
    font-size: 25px;
  }
  .bottomArea {
    width: 100%;
    height: 27%;
  }
  .leftArrow {
    position: absolute;
    left: -10px;
    width: 35%;
  }
  .rightArrow {
    position: absolute;
    right: -10px;
    width: 35%;
  }
`
const StyledLabelCardHeader = styled(LabelCardHeader)`
  width: 100%;
  & span {
    display: flex;
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
        alignItems: 'center',
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '24px',
          boxShadow: '0px 30px 40px rgba(255, 131, 61, 0.15)',
        }}
      >
        <ContextContainer>
          {/* <StyledLabelCardHeader
            labelComponent={<img src={IMAGES.img_quiz_yr} alt="quizIcon" />}
          /> */}
          <div className="textArea">{props.children}</div>
          <div className="bottomArea">
            <img
              src={IMAGES.img_quiz_o_bl}
              alt="LArrow"
              id="-1"
              className="leftArrow"
            />
            <img
              src={IMAGES.img_quiz_x_gr}
              alt="RArrow"
              id="+1"
              className="rightArrow"
            />
          </div>
        </ContextContainer>
      </animated.div>
    </animated.div>
  )
}

export default QuizCard
