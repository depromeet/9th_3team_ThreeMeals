import React from 'react'
import styled from 'styled-components'

import { SVGS } from '../../constants/svgs'

interface Props {
  isLikeActive?: boolean
  labelComponent: React.ReactNode
  className?: string
  onClickLike?: () => void
  onClickOption?: () => void
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

const LabelCardHeader: React.FunctionComponent<Props> = (props) => {
  return (
    <Container className={props.className}>
      {props.labelComponent}

      <span>
        {props.isLikeActive ? (
          <button type="button" onClick={props.onClickLike}>
            <img src={SVGS.icon_32_like_active} alt="active" />
          </button>
        ) : (
          <button type="button" onClick={props.onClickLike}>
            <img src={SVGS.icon_32_like} alt="inactive" />
          </button>
        )}

        {props.onClickOption && (
          <button type="button" onClick={props.onClickOption}>
            <img src={SVGS.icon_32_option} alt="option" />
          </button>
        )}
      </span>
    </Container>
  )
}

export default LabelCardHeader
