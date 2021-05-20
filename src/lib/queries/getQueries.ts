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

export const GET_CHILDREN_COMMENTS = gql`
  query getChildrenComments(
    $first: Float!
    $after: string
    $postId: string!
    $parentId: string!
  ) {
    getChildrenComments(
      first: $first
      after: $after
      postId: $postId
      parentId: $parentId
    ) {
      edges {
        node {
          id
          content
          secretType
          commentState
          createdAt
          updatedAt
          account
          postId
          parentId
        }
      }
    }
  }
`
