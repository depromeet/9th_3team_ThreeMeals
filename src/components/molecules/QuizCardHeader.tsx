import React, { useCallback } from 'react'
import styled from 'styled-components'

import { SVGS } from '../../constants/svgs'
import { IMAGES } from '../../constants/images'
import { BackColor } from '../../types/types'

export interface CardHeaderProps {
  isLikeActive?: boolean
  className?: string
  color: BackColor
  isMyFeed: boolean
  onClickOption?: () => void
  onClickCreateLikePosts: () => void
  onClickDeleteLikePosts: () => void
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

  .writeContainer {
    position: absolute;
    right: -15px;
  }
`
const QuizCardHeader: React.FunctionComponent<CardHeaderProps> = (props) => {
  const getImage = useCallback(
    (color: '#6799FE' | '#67D585' | '#FF823D' | '#CC4349' | '#F1D75F') => {
      switch (color) {
        case '#6799FE':
          return IMAGES.img_quiz_bl
        case '#67D585':
          return IMAGES.img_quiz_gr
        case '#FF823D':
          return IMAGES.img_quiz_or
        case '#CC4349':
          return IMAGES.img_quiz_rd
        case '#F1D75F':
          return IMAGES.img_quiz_yr
        default:
          return IMAGES.img_quiz_or
      }
    },
    []
  )
  return (
    <Container className={props.className}>
      <img src={getImage(props.color)} alt={'quiz'} width="89" height="39" />
      {props.isMyFeed ? (
        <span>
          {props.isLikeActive ? (
            <button type="button" onClick={props.onClickDeleteLikePosts}>
              <img src={SVGS.icon_32_like_active} alt="active" />
            </button>
          ) : (
            <button type="button" onClick={props.onClickCreateLikePosts}>
              <img src={SVGS.icon_32_like} alt="inactive" />
            </button>
          )}
          <button type="button" onClick={props.onClickOption}>
            <img src={SVGS.icon_32_option} alt="option" />
          </button>
        </span>
      ) : null}
    </Container>
  )
}

export default React.memo(QuizCardHeader)
