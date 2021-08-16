import React, { FC, useState, useCallback } from 'react'
import styled from 'styled-components'
import CardContainer from '../atoms/CardContainer'
import dynamic from 'next/dynamic'
import addToPanelVar from '../../lib/localStore/stickerPanel'
import { useReactiveVar } from '@apollo/client'
import { addToWritePostInfo } from '../../lib/localStore/writePost'
import { debounce } from 'lodash'
import { StickerInfo } from '../../types/types'
const StickerPanelWithNoSSR = dynamic(
  () => import('../molecules/StickerPanel'),
  { ssr: false }
)

interface Props {
  backColor: string
  isWithSticker: boolean
  stickers?: StickerInfo[]
}

const WriteQACard: FC<Props> = (props) => {
  const [content, setContent] = useState('')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addContentToWritePost = useCallback(
    debounce((value) => addToWritePostInfo({ content: value }), 500),
    []
  )
  const onChangeContent = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target
      setContent(value)
      addContentToWritePost(value)
    },
    [addContentToWritePost]
  )
  const addToPanelInfo = useReactiveVar(addToPanelVar)

  return (
    <CardContainer backColor={props.backColor}>
      <ContentContainer>
        <textarea
          placeholder={`질문을 자유롭게\n작성해 주세요.`}
          onChange={onChangeContent}
          value={content}
        />
        <StickerContainer isWithSticker={props.isWithSticker}>
          {addToPanelInfo?.imgUrl && addToPanelInfo.width ? (
            <StickerPanelWithNoSSR />
          ) : (
            <div className="placeholder">stickers!</div>
          )}
        </StickerContainer>
      </ContentContainer>
    </CardContainer>
  )
}

export default React.memo(WriteQACard)

interface StickerProps {
  isWithSticker: boolean
}

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  textarea {
    flex: 1;
    overflow: auto;
    width: 100%;
    border: none;
    background: none;
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    color: #000000;
    resize: none;
    &:focus {
      outline: none;
    }
    ::placeholder,
    ::-webkit-input-placeholder {
      opacity: 0.2;
      color: #000000;
    }
    :-ms-input-placeholder {
      opacity: 0.2;
      color: #000000;
    }
  }
`

const StickerContainer = styled.div<StickerProps>`
  display: ${(props) => (props.isWithSticker ? 'block' : 'none')};
  border: dashed 1px rgb(0, 0, 0, 0.3);
  height: 60%;
  img {
    width: 100%;
  }
  .placeholder {
    padding: 10px;
    opacity: 0.3;
  }
`
