import * as React from 'react'
import { storiesOf } from '@storybook/react'
import ContactUsTemplate from '../../components/templates/ContactUsTemplate'
import { action } from '@storybook/addon-actions'

storiesOf('templates/ContactUs', module).add('ContactUsTemplate', () => {
  return (
    <ContactUsTemplate isProfile={false} onClickSend={action('onClickSend')} />
  )
})
