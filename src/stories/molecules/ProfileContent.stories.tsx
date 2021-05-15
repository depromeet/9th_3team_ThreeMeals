// src/stories/Button.stories.tsx

import * as React from 'react'
import { storiesOf } from '@storybook/react'
import ProfileContent from '../../components/molecules/ProfileContent'

storiesOf('molecules/ProfileContent', module).add('with text', () => {
  return (
    <>
      <ProfileContent
        name="김덕배"
        desc="관종이라 자주올림.. 아몰랑~ 그냥 써 🍻"
        urlName="@nijo.s"
        url="https://google.com"
      />
    </>
  )
})
