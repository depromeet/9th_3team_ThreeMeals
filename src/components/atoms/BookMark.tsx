import React, { FC } from 'react'
import styled from 'styled-components'
import { IMAGES } from '../../constants/images'

interface Props {
  isMarked?: boolean
}

const BookMarkImg = styled.img`
  width: 24px;
  height: 24px;
  align-self: center;
`

const BookMark: FC<Props> = (props) => {
  return (
    <BookMarkImg
      src={props.isMarked ? IMAGES.bookmark : IMAGES.bookmark_disabled}
    />
  )
}

export default BookMark
