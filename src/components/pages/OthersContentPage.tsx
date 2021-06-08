import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import { getAccountInfo, GET_ACCOUNT_INFO } from '../../lib/queries/userQueries'
import OthersContentTemplate from '../templates/OthersContentTemplate'
const OthersContentPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const account = useQuery<getAccountInfo>(GET_ACCOUNT_INFO, {
    variables: { accountId: id },
  })

  const onClickAnswerCard = useCallback(
    (postId) => {
      router.push({ pathname: '/answerDetail', query: { postId } })
    },
    [router]
  )
  return (
    <AppContainer>
      <OthersContentTemplate
        account={account.data}
        profileImage={IMAGES.background}
        onClickLeft={() => {}}
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
