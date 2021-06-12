import gql from 'graphql-tag'

export interface CreateContactParams {
  content: string
}
export interface CreateContactResponse {
  id: string
  content: string
  createdAt: string
  sender: {
    id: string
    nickname: string
  }
}

export const CREATE_CONTANT = gql`
  mutation createContact($content: String!) {
    createContact(content: $content) {
      id
      content
      createdAt
      sender {
        id
        nickname
      }
    }
  }
`
