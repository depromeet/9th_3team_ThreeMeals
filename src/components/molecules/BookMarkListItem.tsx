import * as React from 'react'
import styled from 'styled-components'
import BookMark from '../atoms/BookMark'
import EmptyProfileImg from '../atoms/EmptyProfileImg'
import Link from 'next/link'
import { useCallback } from 'react'
interface Props {
  profileImage: string | null
  accountId: string
  title?: string
  isMarked?: boolean
  onClickCancelBookMark: (favoriteId: string) => void
}

const BookMarkListItem: React.FC<Props> = (props: Props) => {
  const linkUrl = `/otherscontent/${props.accountId}`
  const onClickCancelBookMark = useCallback(
    () => props.onClickCancelBookMark(props.accountId),
    [props]
  )
  return (
    <Container>
      <Link href={linkUrl}>
        <Content>
          {props.profileImage ? (
            <Image src={props.profileImage} />
          ) : (
            <EmptyProfileImg size="2rem" />
          )}

          <Title>{props.title}</Title>
        </Content>
      </Link>
      <BookMarkContainer onClick={onClickCancelBookMark}>
        <BookMark isMarked={props.isMarked} />
      </BookMarkContainer>
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
  cursor: pointer;
  flex: auto;
`
const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
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

const BookMarkContainer = styled.div`
  cursor: pointer;
`
