import * as React from 'react'
import styled from 'styled-components'
import { SnsInfo } from '../../lib/queries/meQueries'
import BookMark from '../atoms/BookMark'
import Tag from '../atoms/Tag'

interface Props {
  isMyProfile: boolean
  name: string
  desc: string
  url: string
  urlName: string
  snsInfos: SnsInfo[] | undefined
  isFavoriteAccount?: boolean
}

const ProfileContent: React.FC<Props> = (props: Props) => {
  return (
    <Container>
      <NameText>
        {!props.isMyProfile && (
          <BookMarkContainer>
            <BookMark isMarked={props.isFavoriteAccount} />
          </BookMarkContainer>
        )}
        {props.name}
      </NameText>
      <DescText>{props.desc}</DescText>
      <ProfileInfoContainer>
        {props.snsInfos &&
          props.snsInfos.map((snsInfo) => {
            if (snsInfo.snsId) {
              return (
                <Tag snsId={snsInfo.snsId} snsUrl={snsInfo.url} type="sns" />
              )
            }
          })}

        <Tag
          text={props.urlName}
          isNonClose
          url={props.url}
          type="profileUrl"
        />
      </ProfileInfoContainer>
    </Container>
  )
}
export default React.memo(ProfileContent)

const Container = styled.div`
  padding-left: 24px;
  padding-right: 24px;
`
const BookMarkContainer = styled.div`
  display: flex;
  cursor: pointer;
  align-self: center;
`
const NameText = styled.div`
  display: flex;
  gap: 0.2rem;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin-bottom: 4px;
`
const DescText = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
  /* identical to box height */
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
`

const ProfileInfoContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`
