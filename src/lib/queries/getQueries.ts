import { gql } from '@apollo/client'

export const GET_WRITE_POST_INFO = gql`
  query {
    getWritePostInfo @client
  }
`
