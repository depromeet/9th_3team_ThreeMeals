import * as React from 'react'
import { storiesOf } from '@storybook/react'
import NewSecretCardTemplate from '../../components/templates/NewSecretCardTemplate'
import { action } from '@storybook/addon-actions'

storiesOf('templates/NewSecretCard', module).add(
  'NewSecretCardTemplate',
  () => {
    return (
      <NewSecretCardTemplate isProfile onClickSend={action('onClickSend')} />
    )
  }
)
