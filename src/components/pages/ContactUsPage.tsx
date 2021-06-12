import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { getMyAccountInfo, GET_MY_PROFILE } from '../../lib/queries/meQueries'
import {
  CREATE_CONTANT,
  CreateContactParams,
  CreateContactResponse,
} from '../../lib/queries/createContactQueries'
import ContactUsTemplate from '../templates/ContactUsTemplate'
const ContactUsPage: React.FC = () => {
  const myAccount = useQuery<getMyAccountInfo>(GET_MY_PROFILE)
  const [createContant] =
    useMutation<CreateContactResponse, CreateContactParams>(CREATE_CONTANT)

  const router = useRouter()
  const [isFinish, setIsFinish] = useState<boolean>(false)
  const onClickSend = useCallback(
    (text: string) => {
      if (text.length > 0) {
        createContant({ variables: { content: text } })
          .then((e) => {
            console.log('result', e.data)
            setIsFinish(true)
          })
          .catch(() => {
            alert('네트워크를 확인해주세요. :)')
          })
      } else {
        alert('내용을 입력해주세요. :)')
      }
    },
    [createContant]
  )

  return (
    <AppContainer>
      <ContactUsTemplate
        myAccount={myAccount.data}
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
