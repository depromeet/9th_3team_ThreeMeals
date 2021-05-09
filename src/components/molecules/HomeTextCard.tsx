import React, { FC, CSSProperties } from 'react'
import styled from 'styled-components'
interface Props {
  text:
    | string
    | React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >
  style?: CSSProperties
  textStyle?: CSSProperties
}

const Card = styled.div`
  width: 100%;
  height: 280px;
  padding: 19px 30px;
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
    font-size: 30px;
    height: 100%;
  }
`

const HomeTextCard: FC<Props> = (props) => {
  return (
    <Card style={props.style}>
      <div className="text" style={props.textStyle}>
        {props.text}
      </div>
    </Card>
  )
}

export default HomeTextCard
