import * as React from 'react'
import styled from 'styled-components'
import Tag from '../atoms/Tag'

interface Props {
  name: string
  desc: string
  url: string
  urlName: string
}

const ProfileContent: React.FC<Props> = (props: Props) => {
  return (
    <Container>
      <NameText>{props.name}</NameText>
      <DescText>{props.desc}</DescText>
      <div style={{ display: 'flex' }}>
        <Tag text={props.urlName} isNonClose>
          {props.url}
        </Tag>
      </div>
    </Container>
  )
}
export default React.memo(ProfileContent)

const Container = styled.div`
  padding-left: 24px;
  padding-right: 24px;
`

const NameText = styled.div`
  font-family: Apple SD Gothic Neo;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin-bottom: 4px;
`
const DescText = styled.div`
  font-family: Apple SD Gothic Neo;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
  /* identical to box height */
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
`
