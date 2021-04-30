import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'

import { SVGS } from '../../constants/svgs'

interface Props {
  className?: string
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.02em;

  button {
    &:first-child {
      margin-right: 8px;
    }
  }
`

const TimeShareCardHeader: React.FunctionComponent<Props> = (props) => {
  return (
    <Container className={props.className}>
      {format(new Date(), 'HH:mm:ss')}

      <span>
        <button type="button">
          <img src={SVGS.icon_32_share} alt="share" />
        </button>
        <button type="button">
          <img src={SVGS.icon_32_option} alt="option" />
        </button>
      </span>
    </Container>
  )
}

export default TimeShareCardHeader
