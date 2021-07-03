import React, { FC, useMemo, useState } from 'react'
import Header from '../molecules/Header'
import { IMAGES } from '../../constants/images'
import styled from 'styled-components'
import { SpacingText } from '../../utils/SpacingText'
import { getMyAccountInfo } from '../../lib/queries/meQueries'
interface Props {
  myAccount?: getMyAccountInfo
  data?: string
  isProfile: boolean
  profileImage?: string
  isFinish?: boolean
  onClickLeft?: () => void
  onClickSend: (text: string) => void
}

const ContactUsTemplate: FC<Props> = (props) => {
  const [currentValue, setCurrentValue] = useState('')

  const profileImage = useMemo(() => {
    return props.myAccount?.getMyAccountInfo.image
  }, [props.myAccount?.getMyAccountInfo.image])
  return (
    <AppContainer>
      <Header
        isLogin={props.myAccount ? true : false}
        profileImage={profileImage}
        leftIcon={IMAGES.icon_24_back_wh}
        rightIcon={IMAGES.icon_24_drawer}
        onClickLeft={props.onClickLeft}
      />
      <MainContainer>
        <TapesContainer>
          <img src={IMAGES.tape_contact} alt="tape_contact" width={'100%'} />
        </TapesContainer>
        {!props.isFinish ? (
          <>
            <InputContainer>
              <TextArea
                value={currentValue}
                onChange={(e) => {
                  setCurrentValue(e.target.value)
                }}
                placeholder={
                  '저희에게 궁금한 것, 문의할 것 모두 모두 말씀해주세요!'
                }
              />
            </InputContainer>
            <ButtonContainer>
              {currentValue === '' ? (
                <ButtonImg
                  src={IMAGES.button_floating_send_disabled}
                  alt="button_floating_send"
                />
              ) : (
                <ButtonImg
                  src={IMAGES.button_floating_send}
                  alt="button_floating_send"
                  onClick={() => {
                    props.onClickSend(currentValue)
                  }}
                />
              )}
            </ButtonContainer>
          </>
        ) : (
          <FinishContainer>
            <img
              width={112}
              height={64}
              src={IMAGES.contactUs_fanish}
              alt="contactUs_fanish"
            />
            <FinishText>
              {SpacingText(
                '문의를 성공적으로 보냈습니다!! \\n답변이 등록되면 알림으로 드릴게요!'
              )}
            </FinishText>
          </FinishContainer>
        )}
      </MainContainer>
    </AppContainer>
  )
}

export default ContactUsTemplate

const AppContainer = styled.div`
  color: #ffffff;
  max-width: 500px;
  width: 100%;
`
const MainContainer = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
`

const TapesContainer = styled.div`
  width: 100%;
`
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70%;
`

const TextArea = styled.textarea`
  width: 327px;
  height: 400px;
  border: none;
  background-color: #191919;
  resize: none;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  padding: 24px;
  color: #ffffff;
  &:focus {
    outline: none;
  }
`

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
`

const ButtonImg = styled.img`
  margin-right: 24px;
  margin-bottom: 40px;
`

const FinishContainer = styled.div`
  height: 70%;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const FinishText = styled.div`
  margin-top: 20px;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.02em;

  color: #ffffff;
`
