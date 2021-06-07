import { gql } from '@apollo/client'

export const GET_NOTIFICATIONS = gql`
  query {
    getNotifications {
      id
      notificationType
      account {
        id
      }
      relatedPost {
        id
      }
    }
  }
`
