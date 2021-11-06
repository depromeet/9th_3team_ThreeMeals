// src/stories/BookMarkListItem.stories.tsx

import * as React from 'react'
import { storiesOf } from '@storybook/react'
import BookMarkListItem from '../../components/molecules/BookMarkListItem'
import { HOME_ICONS, IMAGES } from '../../constants/images'
import styled from 'styled-components'

storiesOf('molecules/BookMarkListItem', module).add('with text', () => {
  return (
    <Container>
      <Column>
        <BookMarkListItem
          profileImage={IMAGES.sticker_food_bread}
          title={'가나다'}
          isMarked
        />
      </Column>
      <Column>
        <BookMarkListItem
          profileImage={IMAGES.sticker_food_bread}
          title={'마바사'}
          isMarked
        />
      </Column>
      <Column>
        <BookMarkListItem
          profileImage={IMAGES.sticker_food_bread}
          title={'아자차'}
        />
      </Column>
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Column = styled.div`
  margin: 10px 0;
`
