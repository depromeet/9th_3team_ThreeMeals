import React, { FC, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { timeDiffCalc } from '../../utils/TimeDiffCalc'
interface Props {
  myNickName: string | undefined
  content: string
  contentType: string
  time: string
  otherContentInfo?: {
    nickname: string
    postType: 'Ask' | 'Quiz' | 'Answer'
    isLikeNotiType: boolean
  }
}

interface FieldContainerProps {
  isWithOtherAccount: boolean
}

const FieldContainer = styled.div<FieldContainerProps>`
  width: 100%;
  min-width: 335px;
  height: 84px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 6px 11px rgba(0, 0, 0, 0.04);
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  padding: 15px 20px;
  margin-bottom: 1rem;
  ${({ isWithOtherAccount }) =>
    isWithOtherAccount &&
    `background: rgba(103, 213, 133, 0.05); 1px solid rgba(103, 213, 133, 0.1);`}
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
  .contentTitle {
    font-weight: bold;
    ${({ isWithOtherAccount }) => isWithOtherAccount && `color: #67D585;`}
  }
  .contentText {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

const AlarmContentField: FC<Props> = (props) => {
  const contentType = useMemo(() => {
    if (props.contentType === 'Ask') {
      return '물어봐'
    } else if (props.contentType === 'Answer') {
      return '답해줘'
    } else if (props.contentType === 'Quiz') {
      return 'OX'
    } else undefined
  }, [props.contentType])
  const contentTitleWithOtherAccount = useMemo(() => {
    switch (props.otherContentInfo?.postType) {
      case 'Ask':
        return `${props.otherContentInfo.nickname}님의 물어봐`
      case 'Quiz':
        return `${props.otherContentInfo.nickname}님의 OX`
      default:
        undefined
    }
  }, [props.otherContentInfo?.nickname, props.otherContentInfo?.postType])
  const otherContentText = useMemo(() => {
    switch (props.otherContentInfo?.isLikeNotiType) {
      case true:
        return `${props.otherContentInfo.nickname}님이 ${props.myNickName}님의 카드를 좋아합니다.`
      case false:
        return `${props.myNickName}님이 작성한 카드에 답변이 달렸습니다.`
      default:
        undefined
    }
  }, [
    props.myNickName,
    props.otherContentInfo?.isLikeNotiType,
    props.otherContentInfo?.nickname,
  ])
  const checkIsWithOtherAccount = useCallback(() => {
    return props.otherContentInfo !== undefined
  }, [props.otherContentInfo])
  return (
    <FieldContainer isWithOtherAccount={checkIsWithOtherAccount()}>
      <div className="header">
        <span className="contentTitle">
          {props.otherContentInfo ? contentTitleWithOtherAccount : contentType}
        </span>
        <span className="time">
          {timeDiffCalc(new Date(props.time), new Date())}
        </span>
      </div>
      <div className="content">
        <span className="contentText">
          {props.otherContentInfo ? otherContentText : props.content}
        </span>
      </div>
    </FieldContainer>
  )
}

export default AlarmContentField
