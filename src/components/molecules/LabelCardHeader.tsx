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
`

const LabelCardHeader: React.FunctionComponent<Props> = (props) => {
  return (
    <Container>
      <CardLabel text={props.labelString} />

      <span>
        {props.isLikeActive ? SVGS.icon_32_like_active : SVGS.icon_32_like}
        {SVGS.icon_32_option}
      </span>
    </Container>
  )
}

export default LabelCardHeader
