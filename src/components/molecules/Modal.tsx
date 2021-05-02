import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import Modal, { ModalProvider, BaseModalBackground } from 'styled-react-modal'

interface Props {
  titleEmoji: string
  title: string
  description?: string
  confirmText: string
  confirmSecondText?: string
  cancelText: string
  open?: boolean
  onClickConfirm?: () => void
  onClickConfirmSecond?: () => void
}
const ModalContainer: React.FC<Props> = (props: Props) => {
  const [isOpen, setIsOpen] = useState(props.open)
  const [opacity, setOpacity] = useState(0)

  const toggleModal = useCallback(() => {
    setOpacity(0)
    setIsOpen(!isOpen)
  }, [opacity, isOpen])

  const afterOpen = useCallback(() => {
    setTimeout(() => {
      setOpacity(1)
    }, 100)
  }, [opacity])

  const beforeClose = useCallback(() => {
    return new Promise((resolve) => {
      setOpacity(0)
      setTimeout(resolve, 300)
    })
  }, [opacity])

  return (
    <ModalProvider backgroundComponent={FadingBackground}>
      <button onClick={toggleModal}>{props.title}</button>
      <StyledModal
        isOpen={isOpen || false}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        backgroundProps={{ opacity }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // The library is not give the props type of style
        isSecondBtn={props.onClickConfirmSecond !== undefined}
      >
        <Container>
          <EmojiContainer>
            <Emoji src={props.titleEmoji} />
          </EmojiContainer>
          <Title>{props.title}</Title>
          <Description>{props.description}</Description>
          <ConfirmText onClick={props.onClickConfirm}>
            {props.confirmText}
          </ConfirmText>
          {props.onClickConfirmSecond && (
            <ConfirmText onClick={props.onClickConfirmSecond}>
              {props.confirmSecondText}
            </ConfirmText>
          )}
          <CancelText onClick={toggleModal}>{props.cancelText}</CancelText>
        </Container>
      </StyledModal>
    </ModalProvider>
  )
}

export default ModalContainer

const StyledModal = Modal.styled`
  width: 311px;
  height: ${(props: { isSecondBtn: boolean }) =>
    props.isSecondBtn ? '314px' : '288px'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition : all 0.3s ease-in-out;
  background-color: #181818;
  border-radius: 16px;
`

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props: { opacity: number }) => props.opacity};
  transition: all 0.3s ease-in-out;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
`

const Container = styled.div``

const EmojiContainer = styled.div`
  text-align: center;
`
const Emoji = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 3px;
`

const Title = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin-bottom: 8px;
`
const Description = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #d3d3d3;
  margin-bottom: 24px;
`
const ConfirmText = styled.div`
  background: #67d585;
  border-radius: 100px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #000000;
  margin-bottom: 20px;
  cursor: pointer;
`
const CancelText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #67d585;
  cursor: pointer;
`
