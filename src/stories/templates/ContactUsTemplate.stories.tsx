import * as React from 'react'
import { storiesOf } from '@storybook/react'
import ContactUsTemplate from '../../components/templates/ContactUsTemplate'
import { action } from '@storybook/addon-actions'
import styled from 'styled-components'

storiesOf('templates/ContactUs', module).add('ContactUsTemplate', () => {
  return (
    <AppContainer>
      <ContactUsTemplate
        isProfile={false}
        onClickSend={action('onClickSend')}
      />
    </AppContainer>
  )
})

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
