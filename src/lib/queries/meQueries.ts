import { gql } from '@apollo/client'

export const GET_MY_PROFILE = gql`
  query {
    getAccountInfo {
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

export const CREATE_ACCOUNT_INFO = gql`
  mutation createAccountInfo($content: String!) {
    createAccountInfo(content: $content) {
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
