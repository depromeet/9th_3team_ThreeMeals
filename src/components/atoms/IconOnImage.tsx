import * as React from 'react'
import styled, { CSSProperties } from 'styled-components'

interface Props {
  containerStyle?: CSSProperties
  image: string
  imageStyle?: CSSProperties
  icon: string
  iconStyle?: CSSProperties
  onClickIcon?: () => void
}

const IconOnImage: React.FC<Props> = (props: Props) => {
  return (
    <Container style={props.containerStyle}>
      <Image style={props.imageStyle} src={props.image} />
      <IconContainer>
        <Icon
          onClick={props.onClickIcon}
          style={props.iconStyle}
          src={props.icon}
        />
      </IconContainer>
    </Container>
  )
}

export default IconOnImage

const Container = styled.div`
  display: flex;
  flex-direction: row;
`
const Image = styled.img`
  border-radius: 50%;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #67d585;
  border: 2px solid #191919;
  box-sizing: border-box;
  border-radius: 50%;
  width: 32px;
  height: 32px;

  position: relative;
  top: 50px;
  right: 25px;
`
const Icon = styled.img``
