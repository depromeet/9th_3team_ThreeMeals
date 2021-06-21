import * as React from 'react'
import { storiesOf } from '@storybook/react'
import ContentTemplate from '../../components/templates/ContentTemplate'
import { IMAGES } from '../../constants/images'
import styled from 'styled-components'
import { action } from '@storybook/addon-actions'

storiesOf('templates/Content', module).add('ContentTemplate', () => {
  return (
    <AppContainer>
      <ContentTemplate
        profileImage={IMAGES.background}
        isProfile={false}
        newPostCount={0}
        tabIndex={0}
        onClickAnswerCard={action('onClickAnswerCard')}
        onClickLike={action('onClickLike')}
        onClickNewSecretCard={action('onClickNewSecretCard')}
        onClickRemove={action('onClickRemove')}
        onClickTabIndex={action('onClickTabIndex')}
      />
    </AppContainer>
  )
})

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
