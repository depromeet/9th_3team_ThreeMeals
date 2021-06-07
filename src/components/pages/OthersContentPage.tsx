import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import { getMyAccountInfo, GET_MY_PROFILE } from '../../lib/queries/meQueries'
import OthersContentTemplate from '../templates/OthersContentTemplate'
const OthersContentPage: React.FC = () => {
  const myAccount = useQuery<getMyAccountInfo>(GET_MY_PROFILE)
  const router = useRouter()

  const onClickAnswerCard = useCallback(
    (postId) => {
      router.push({ pathname: '/answerDetail', query: { postId } })
    },
    [router]
  )
  return (
    <AppContainer>
      <OthersContentTemplate
        myAccount={myAccount.data}
        profileImage={IMAGES.background}
        onClickLeft={router.back}
        onClickSecondRight={() => {
          router.push('/notification')
        }}
        onClickAnswerCard={onClickAnswerCard}
      />
    </AppContainer>
  )
}

export default OthersContentPage

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
