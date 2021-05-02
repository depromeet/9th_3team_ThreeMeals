import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Modal from '../../components/molecules/Modal'
import { action } from '@storybook/addon-actions'
import { IMAGES } from '../../constants/images'

storiesOf('molecules/Modal', module).add('with text', () => {
  return (
    <>
      <Modal
        titleEmoji={IMAGES.background}
        title={'작성을 완료 하시겠습니까?'}
        description={'욕설 및 비방은 신고의 대상이 될 수 있습니다.'}
        confirmText={'작성완료'}
        cancelText={'취소'}
        onClickConfirm={action('onClickConfirm')}
      />
      <Modal
        titleEmoji={IMAGES.background}
        title={'프로필 사진을 변경하시겠습니까?'}
        confirmText={'앨범에서 사진 선택'}
        confirmSecondText={'기본 이미지로 변경'}
        cancelText={'취소'}
        onClickConfirm={action('onClickConfirm')}
        onClickConfirmSecond={action('onClickConfirmSecond')}
      />
    </>
  )
})
