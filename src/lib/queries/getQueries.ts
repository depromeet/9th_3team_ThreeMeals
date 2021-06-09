import { gql } from '@apollo/client'

export const GET_MY_NEW_POST_COUNT = gql`
  query {
    getMyNewPostCount {
      postCount {
        count
        postType
      }
    }
  }
`

export const GET_WRITE_POST_INFO = gql`
  query {
    getWritePostInfo @client
  }
`
