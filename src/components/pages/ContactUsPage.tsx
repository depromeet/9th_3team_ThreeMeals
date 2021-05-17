import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import ContactUsTemplate from '../templates/ContactUsTemplate'
const ContactUsPage: React.FC = () => {
  const router = useRouter()
  const [isFinish, setIsFinish] = useState<boolean>(false)
  const onClickSend = useCallback((text: string) => {
    console.log('text:', text)
    text.length > 0 && setIsFinish(true)
  }, [])

  return (
    <AppContainer>
      <ContactUsTemplate
        onClickLeft={router.back}
        isProfile={false}
        onClickSend={onClickSend}
        isFinish={isFinish}
      />
    </AppContainer>
  )
}

export default ContactUsPage

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
