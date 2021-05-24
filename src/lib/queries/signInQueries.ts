import { gql } from '@apollo/client'

export const SIGN_IN = gql`
  mutation signIn($accessToken: String!, $provider: String!) {
    signIn(accessToken: $accessToken, provider: $provider) {
      token
    }
  }
`
