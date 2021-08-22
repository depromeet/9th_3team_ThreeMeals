import * as React from 'react'
import styled, { CSSProperties } from 'styled-components'
import Avatar from 'boring-avatars'

interface Props {
  containerStyle?: CSSProperties
  curImage: string | undefined
  image: string
  imageStyle?: CSSProperties
  icon: string
  iconStyle?: CSSProperties
  onClickIcon?: () => void
}

const IconOnImage: React.FC<Props> = (props: Props) => {
  return (
    <Container style={props.containerStyle}>
      {props.curImage ? (
        <Image style={props.imageStyle} src={props.image} />
      ) : (
        <Avatar
          size={'5rem'}
          name="https://source.boringavatars.com/"
          variant="beam"
          colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
        />
      )}
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
