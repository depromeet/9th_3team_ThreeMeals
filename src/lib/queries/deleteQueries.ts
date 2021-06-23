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

export interface deleteLikeRes {
  postId: string
}
export interface deleteLikeParams {
  postId: string
}

export const DELETE_LIKE = gql`
  mutation deleteLikePosts($postId: String!) {
    deleteLikePosts(postId: $postId)
  }
`

export interface deleteCommentRes {
  message: string
}
export interface deleteCommentParams {
  commentId: string
}

export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: String!) {
    deleteComment(commentId: $commentId) {
      message
    }
  }
`
