import gql from 'graphql-tag'

export interface CreateCommentAskParams {
  postId: string
  content: string
  secretType: string
}
export interface CreateCommentAskResponse {
  id: string
  content: string
  secretType: string
  commentState: string
  updatedAt: string
  account: {
    id: string
  }
  postId: string
  parentId: string
}

export const CREATE_COMMENT_ASK = gql`
  mutation createComment(
    $postId: String!
    $content: String!
    $secretType: String!
  ) {
    createComment(postId: $postId, content: $content, secretType: $secretType) {
      id
      content
      secretType
      commentState
      updatedAt
      account {
        id
      }
      postId
      parentId
    }
  }
`
