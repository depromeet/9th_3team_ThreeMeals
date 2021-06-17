import gql from 'graphql-tag'

export interface deletePostParams {
  postId: string
}

export interface deletePostResponse {
  message: string
}
export const DELETE_POST = gql`
  mutation deletePost($postId: String!) {
    deletePost(postId: $postId) {
      message
    }
  }
`

export interface deleteCommentParams {
  commentId: string
}

export interface deleteCommentResponse {
  message: string
}
export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: String!) {
    deleteComment(commentId: $commentId) {
      message
    }
  }
`
