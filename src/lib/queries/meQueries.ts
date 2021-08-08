import { gql } from '@apollo/client'

export interface getMyAccountInfo {
  getMyAccountInfo: {
    id: string
    nickname: string
    status: string
    image: string
    content: string
    profileUrl: string
  }
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
  mutation updateAccountInfo(
    $content: String
    $nickname: String!
    $profileUrl: String
  ) {
    updateAccountInfo(
      content: $content
      nickname: $nickname
      profileUrl: $profileUrl
    ) {
      id
      nickname
      status
      image
      content
      profileUrl
    }
  }
`

export const UPDATE_DEFAULT_PROFILE_IMAGE = gql`
  mutation updateImageToBasic {
    updateImageToBasic
  }
`
