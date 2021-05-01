import React from 'react'
import styled from 'styled-components'

import { SVGS } from '../../constants/svgs'

interface Props {
  isLikeActive?: boolean
  labelComponent: React.ReactNode
  className?: string
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    &:first-child {
      margin-right: 8px;
    }
  }
`

const QuizCardHeader: React.FunctionComponent<Props> = (props) => {
  return (
    <Container className={props.className}>
      {props.labelComponent}

      <span>
        {props.isLikeActive ? (
          <button type="button">
            <img src={SVGS.icon_32_like_active} alt="active" />
          </button>
        ) : (
          <button type="button">
            <img src={SVGS.icon_32_like} alt="inactive" />
          </button>
        )}
        <button type="button">
          <img src={SVGS.icon_32_option} alt="option" />
        </button>
      </span>
    </Container>
  )
}

export default QuizCardHeader
