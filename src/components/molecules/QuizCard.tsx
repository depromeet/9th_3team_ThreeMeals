import React, { FC, PropsWithChildren, useCallback } from 'react'
import styled from 'styled-components'
import { animated, to, SpringValue } from 'react-spring'
import { Vector2, ReactEventHandlers } from 'react-use-gesture/dist/types'
import { IMAGES } from '../../constants/images'
import QuizCardHeader from './QuizCardHeader'
import { BackColor } from '../../types/types'
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
  bottomHeight: number | string
  backColor: BackColor
}

interface StyledProps {
  bottomHeight: number | string
}

const QuizCard: FC<PropsWithChildren<Props>> = (props) => {
  const getOImg = useCallback(
    (color: '#6799FE' | '#67D585' | '#FF823D' | '#F1D75F' | '#CC4349') => {
      switch (color) {
        case '#6799FE':
          return IMAGES.img_quiz_o_gr
        case '#67D585':
          return IMAGES.img_quiz_o_yl
        case '#FF823D':
          return IMAGES.img_quiz_o_bl
        case '#F1D75F':
          return IMAGES.img_quiz_o_bl
        case '#CC4349':
          return IMAGES.img_quiz_o_yr
        default:
          return IMAGES.img_quiz_o_bl
      }
    },
    []
  )
  const getXImg = useCallback(
    (color: '#6799FE' | '#67D585' | '#FF823D' | '#F1D75F' | '#CC4349') => {
      switch (color) {
        case '#6799FE':
          return IMAGES.img_quiz_x_yr
        case '#67D585':
          return IMAGES.img_quiz_x_bl
        case '#FF823D':
          return IMAGES.img_quiz_x_gr
        case '#F1D75F':
          return IMAGES.img_quiz_x_yr
        case '#CC4349':
          return IMAGES.img_quiz_x_yl
        default:
          return IMAGES.img_quiz_x_bl
      }
    },
    []
  )
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
          backgroundColor: `${props.backColor}`,
          height: '360px',
          width: '327px',
          cursor: 'pointer',
          willChange: 'transform',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '24px',
          boxShadow: '0px 30px 40px #191919',
        }}
      >
        <ContextContainer bottomHeight={props.bottomHeight}>
          <StyledQuizCardHeader
            color={props.backColor}
            isMyFeed={true}
            isAnswerNewOXPage
          />
          <div className="textArea">{props.children}</div>
          <div className="bottomArea">
            <img
              src={getXImg(props.backColor)}
              alt="LArrow"
              id="-1"
              className="leftArrow"
            />
            <img
              src={getOImg(props.backColor)}
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

export const ContextContainer = styled.div<StyledProps>`
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
    color: black;
  }
  .bottomArea {
    width: 100%;
    height: ${(props) => props.bottomHeight}%;
  }
  .leftArrow {
    position: absolute;
    left: -10px;
    width: 35%;
    transform: rotate(180deg);
  }
  .rightArrow {
    position: absolute;
    right: -10px;
    width: 35%;
    transform: rotate(180deg);
  }
  .answerImg {
    right: -90px;
    position: relative;
    width: 70%;
  }
`
export const StyledQuizCardHeader = styled(QuizCardHeader)`
  width: 100%;
  & span {
    display: flex;
  }
`
