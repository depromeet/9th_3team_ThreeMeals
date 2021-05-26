import React, { FC } from 'react'
import styled from 'styled-components'
import { SVGS } from '../../constants/svgs'
interface Props {
  optionType: OptionType
}
export interface OptionType {
  Temp?: boolean
  Forever?: boolean
}
const OptionAlarmField: FC<Props> = (props) => {
  return (
    <FieldContainer>
      {props.optionType.Forever ? (
        <span className="header">Bong-in</span>
      ) : (
        <span className="header">
          <img src={SVGS.time_wh} alt="time_wh" />
          secret 24
        </span>
      )}
      <span className="explanation">
        {props.optionType.Forever
          ? 'Bong-in은 평생 익명이랍니다.'
          : '24시간 후 받은 사람에게만 내 프로필이 공개됩니다.'}
      </span>
    </FieldContainer>
  )
}

export default OptionAlarmField

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 78px;
  border-radius: 12px;
  background: #67d585;
  opacity: 0.3;
  border: 1px solid #67d585;
  .header {
    color: #67d585;
  }
  .explanation {
    color: #ffffff;
    opacity: 0.8;
    letter-spacing: -0.04em;
    text-align: center;
    font-family: SF Pro Display;
  }
`
