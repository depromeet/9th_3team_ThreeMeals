import * as React from 'react'
import styled from 'styled-components'
import BookMark from '../atoms/BookMark'

interface Props {
  profileImage: string
  title?: string
  isMarked?: boolean
}

const BookMarkListItem: React.FC<Props> = (props: Props) => {
  return (
    <Container>
      <Content>
        <Image src={props.profileImage} />
        <Title>{props.title}</Title>
      </Content>
      <BookMark isMarked={props.isMarked} />
    </Container>
  )
}
export default React.memo(BookMarkListItem)

const Container = styled.div`
  min-width: 343px;
  height: 60px;
  background: #242424;
  box-shadow: 0px 6px 11px rgba(0, 0, 0, 0.04);
  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 24px;
`

const Content = styled.div`
  display: flex;
  align-items: center;
`
const Image = styled.img`
  width: 40px;
  height: 40px;
`

const Title = styled.div`
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  letter-spacing: -0.02em;

  color: #ffffff;

  opacity: 0.9;

  margin-left: 8px;
`
