import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import Header from '../molecules/Header'

interface Props {
  onClickLeft?: () => void
  onClickRight?: () => void
}

const ProfileEditTemplate: React.FC<Props> = (props: Props) => {
  const [currentValue, setCurrentValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight + 'px'
    }
  }, [currentValue])

  return (
    <Container>
      <Header
        leftIcon={IMAGES.icon_24_back_wh}
        rightText={'저장'}
        onClickLeft={props.onClickLeft}
        onClickRight={props.onClickRight}
        blurRightText={currentValue === ''}
      />
      <InputContainer>
        <TextArea
          ref={textareaRef}
          value={currentValue}
          onChange={(e) => {
            console.log('e:', e.target.value)
            setCurrentValue(e.target.value)
          }}
          placeholder={'소개글을 작성해주세요.'}
        />
      </InputContainer>
    </Container>
  )
}

export default ProfileEditTemplate

const Container = styled.div`
  display: block;
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70%;
`

const TextArea = styled.textarea`
  border: none;
  background-color: #191919;
  resize: none;
  color: #ffffff;
  opacity: 0.3;
  text-align: center;
  width: 70%;
  &:focus {
    outline: none;
  }
`
