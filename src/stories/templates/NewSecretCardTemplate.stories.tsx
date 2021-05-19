import * as React from 'react'
import { storiesOf } from '@storybook/react'
import NewSecretCardTemplate from '../../components/templates/NewSecretCardTemplate'
import { action } from '@storybook/addon-actions'
import styled from 'styled-components'

storiesOf('templates/NewSecretCard', module).add(
  'NewSecretCardTemplate',
  () => {
    return (
      <AppContainer>
        <NewSecretCardTemplate onClickSend={action('onClickSend')} />
      </AppContainer>
    )
  }
)
const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
