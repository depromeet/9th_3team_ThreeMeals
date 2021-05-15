import * as React from 'react'
import { storiesOf } from '@storybook/react'
import ContentTemplate from '../../components/templates/ContentTemplate'
import { IMAGES } from '../../constants/images'

storiesOf('templates/Content', module).add('ContentTemplate', () => {
  return <ContentTemplate isProfile={false} profileImage={IMAGES.background} />
})
