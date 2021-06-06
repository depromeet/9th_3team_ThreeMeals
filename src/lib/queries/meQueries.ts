import { gql } from '@apollo/client'

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
    getMyAccountInfo {
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
      provider
      providerId
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
