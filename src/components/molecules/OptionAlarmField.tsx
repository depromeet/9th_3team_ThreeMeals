import React, { FC } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { SVGS } from '../../constants/svgs'
interface Props {
  optionType: OptionType
}
export interface OptionType {
  Temp: boolean
  Forever: boolean
}
const OptionAlarmField: FC<Props> = (props) => {
  return (
    <FieldContainer optionType={props.optionType}>
      {props.optionType.Forever ? (
        <span className="header">Bong-in</span>
      ) : (
        <span className="header">
          <img src={SVGS.icon_time_gr} alt="time_wh" />
          &nbsp; secret 24
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

export default React.memo(OptionAlarmField)

interface FieldProps {
  optionType: OptionType
}
const showDisplay = keyframes`
    0% {
      opacity: 0;
    }
    30%{
      opacity:1;
    }
    50% {
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
`

const FieldContainer = styled.div<FieldProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 78px;
  border-radius: 16px;
  background: rgba(103, 213, 133, 0.1);
  border: 1px solid rgba(103, 213, 133, 0.2);
  line-height: 30px;
  .header {
    color: #67d585;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-family: Montserrat;
  }
  .explanation {
    color: #ffffff;
    opacity: 0.8;
    letter-spacing: -0.04em;
    text-align: center;
    font-family: SF Pro Display;
  }
  ${({ optionType }) => {
    if (optionType.Temp || optionType.Forever) {
      return css`
        animation: ${showDisplay} 3s linear both;
      `
    }
  }}
`
