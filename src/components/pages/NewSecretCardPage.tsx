import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'
import NewSecretCardTemplate from '../templates/NewSecretCardTemplate'
import Modal from '../molecules/Modal'
const NewSecretCardPage: React.FC = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const onClickSend = useCallback((text: string) => {
    console.log('finish text : ', text)
  }, [])

  const onClickRemove = useCallback((id: string) => {
    console.log('onClickRemove id', id)
    setIsOpen(true)
  }, [])

  const onClickLike = useCallback((id: string) => {
    console.log('onClickLike id', id)
  }, [])
  return (
    <AppContainer>
      <NewSecretCardTemplate
        profileImage={IMAGES.background}
        onClickSend={onClickSend}
        onClickLeft={router.back}
        onClickRemove={onClickRemove}
        onClickLike={onClickLike}
      />
      <Modal
        open={isOpen}
        title={'💬 이 질문을 삭제하시겠습니까?'}
        confirmText={'삭제하기'}
        cancelText={'취소'}
        onClickConfirm={() => {
          console.log('onClickMOdal')
        }}
        onClickCancel={() => {
          setIsOpen(false)
        }}
      />
    </AppContainer>
  )
}

export default NewSecretCardPage

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
