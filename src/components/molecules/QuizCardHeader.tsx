import React from 'react'
import styled from 'styled-components'

import { SVGS } from '../../constants/svgs'
import { IMAGES } from '../../constants/images'

export interface CardHeaderProps {
  isLikeActive?: boolean
  className?: string
  color: 'blue' | 'green' | 'orange' | 'red' | 'yellow'
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

const getImage = (color: 'blue' | 'green' | 'orange' | 'red' | 'yellow') => {
  switch (color) {
    case 'blue':
      return IMAGES.img_quiz_bl
    case 'green':
      return IMAGES.img_quiz_gr
    case 'orange':
      return IMAGES.img_quiz_or
    case 'red':
      return IMAGES.img_quiz_rd
    case 'yellow':
      return IMAGES.img_quiz_yr
    default:
      break
  }
}

const QuizCardHeader: React.FunctionComponent<CardHeaderProps> = (props) => {
  return (
    <Container className={props.className}>
      <img src={getImage(props.color)} alt={'quiz'} width="89" height="39" />

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
