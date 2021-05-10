import React from 'react'
import styled from 'styled-components'
import { SVGS } from '../../constants/svgs'

const Container = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.02em;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  img {
    margin-right: 8px;
    margin-bottom: 3px;
  }
`

interface Props {
  count: number
}

const CommentCount: React.FunctionComponent<Props> = (props) => {
  return (
    <Container>
      <img src={SVGS.icon_24_comment} alt="comment" />
      <span>{props.count} 개</span>
    </Container>
  )
}

export default CommentCount
