import { gql } from '@apollo/client'

export interface getMyAccountInfo {
  getMyAccountInfo: {
    id: string
    nickname: string
    status: string
    image: string
    content: string
    profileUrl: string
    snsInfos: SnsInfo[]
  }
}

export interface SnsInfo {
  snsId: string
  snsType: 'Instagram' | 'Facebook'
  url: string
}

export const GET_MY_PROFILE = gql`
  query {
    getMyAccountInfo {
      id
      nickname
      status
      image
      content
      profileUrl
      snsInfos {
        url
        snsId
      }
    }
  }
`

export const GET_MY_CONTENT = gql`
  query {
    getAccountInfo {
      content
    }
  }
`

export const UPDATE_ACCOUNT_INFO = gql`
  mutation updateAccountInfo($content: String, $nickname: String!) {
    updateAccountInfo(content: $content, nickname: $nickname) {
      id
      nickname
      status
      image
      content
      snsInfos {
        url
      }
    }
  }
`

export const UPDATE_DEFAULT_PROFILE_IMAGE = gql`
  mutation updateImageToBasic {
    updateImageToBasic
  }
`

export const REGISTER_SNSINFO = gql`
  mutation registerSnsInfo($snsId: String!, $url: String!, $snsType: String!) {
    registerSnsInfo(snsId: $snsId, url: $url, snsType: $snsType) {
      message
    }
  }
`

export const DEREGISTER_SNSINFO = gql`
  mutation deregisterSnsInfo($snsType: String!) {
    deregisterSnsInfo(snsType: $snsType) {
      message
    }
  }
`
