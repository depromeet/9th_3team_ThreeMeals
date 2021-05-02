import React, { FC } from 'react'
import styled from 'styled-components'
interface Props {
  content: string
  contentType: string
  time: string
}
const FieldContainer = styled.div`
  width: 100%;
  min-width: 335px;
  height: 84px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 6px 11px rgba(0, 0, 0, 0.04);
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  padding: 15px 20px;
  .header {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .time {
      font-size: 12px;
      opacity: 0.5;
    }
  }
  .content {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    opacity: 0.8;
  }
`

const AlarmContentField: FC<Props> = (props) => {
  return (
    <FieldContainer>
      <div className="header">
        <span>{props.contentType}</span>
        <span className="time">{props.time}</span>
      </div>
      <div className="content">{props.content}</div>
    </FieldContainer>
  )
}

export default AlarmContentField
