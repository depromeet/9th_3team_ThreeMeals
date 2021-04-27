import React from 'react'
import styled from 'styled-components'

import { SVGS } from '../../constants/svgs'
import CardLabel from '../atoms/CardLabel'

interface Props {
  labelString: string
  isLikeActive: boolean
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LabelCardHeader: React.FunctionComponent<Props> = (props) => {
  return (
    <Container>
      <CardLabel text={props.labelString} />

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

export default LabelCardHeader
