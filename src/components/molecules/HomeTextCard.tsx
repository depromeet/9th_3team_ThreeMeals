import React, { FC, CSSProperties } from 'react'
import styled from 'styled-components'
import { SpacingText } from '../../utils/SpacingText'
interface Props {
  text: string
  style?: CSSProperties
  textStyle?: CSSProperties
}

const Card = styled.div`
  width: 100%;
  height: 280px;
  padding: 19px 10px;
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Apple SD Gothic Neo;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: rgba(255, 255, 255, 0.7);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 24px;
    font-size: 24px;
    height: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }
`

const HomeTextCard: FC<Props> = (props) => {
  const SplitedText = SpacingText(props.text)
  return (
    <Card style={props.style}>
      <div className="text" style={props.textStyle}>
        {SplitedText}
      </div>
    </Card>
  )
}

export default HomeTextCard
