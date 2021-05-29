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
