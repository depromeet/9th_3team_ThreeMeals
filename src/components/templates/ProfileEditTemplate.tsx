import { useEffect, useRef, useState, useMemo } from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

import {
  UPDATE_ACCOUNT_INFO,
  GET_MY_PROFILE,
} from '../../lib/queries/meQueries'
import { IMAGES } from '../../constants/images'
import Header from '../molecules/Header'

interface Props {
  onClickLeft?: () => void
  onClickRight?: () => void
}

const ProfileEditTemplate: React.FC<Props> = (props: Props) => {
  const router = useRouter()
  const { edit } = router.query
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const {
    data: { getAccountInfo },
  } = useQuery(GET_MY_PROFILE)

  const content = useMemo(() => {
    if (edit === 'profileEdit') {
      return getAccountInfo.profileUrl
    }
    if (edit === 'nameEdit') {
      return getAccountInfo.nickname
    }
    if (edit === 'contentEdit') {
      return getAccountInfo.content
    }
  }, [edit])

  const placeHolder = useMemo(() => {
    if (edit === 'profileEdit') {
      return '인스타그램 아이디를 작성해주세요.'
    }
    if (edit === 'nameEdit') {
      return '닉네임을 작성해주세요.'
    }
    if (edit === 'contentEdit') {
      return '소개글을 작성해주세요.'
    }
    return ''
  }, [edit])

  const maxLengthTextArea = useMemo(() => {
    if (edit === 'contentEdit') {
      return 50
    }

    return 18
  }, [edit])

  const [currentValue, setCurrentValue] = useState(content)

  const [updateAccountInfo] = useMutation(UPDATE_ACCOUNT_INFO, {
    onCompleted: () => {
      props.onClickRight?.()
    },
  })

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight + 'px'
    }
  }, [currentValue])

  const onSave = () => {
    if (edit === 'profileEdit') {
      updateAccountInfo({
        variables: {
          profileUrl: currentValue,
          nickname: getAccountInfo.nickname,
        },
      })
      return
    }
    if (edit === 'nameEdit') {
      updateAccountInfo({
        variables: {
          nickname: currentValue,
        },
      })
      return
    }
    if (edit === 'contentEdit') {
      updateAccountInfo({
        variables: {
          content: currentValue,
          nickname: getAccountInfo.nickname,
        },
      })
    }
  }

  return (
    <Container>
      <Header
        leftIcon={IMAGES.icon_24_back_wh}
        rightText={'저장'}
        onClickLeft={props.onClickLeft}
        onClickRight={onSave}
        blurRightText={currentValue === ''}
      />
      <InputContainer>
        <TextArea
          ref={textareaRef}
          value={currentValue}
          onChange={(e) => {
            setCurrentValue(e.target.value)
          }}
          placeholder={placeHolder}
          maxLength={maxLengthTextArea}
        />
      </InputContainer>
    </Container>
  )
}

export default ProfileEditTemplate

const Container = styled.div`
  max-width: 500px;
  width: 100%;
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
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.02em;

  &:focus {
    outline: none;
  }
`
