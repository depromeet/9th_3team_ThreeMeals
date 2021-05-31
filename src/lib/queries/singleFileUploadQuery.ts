import { gql } from '@apollo/client'

export const SINGLE_UPLOAD = gql`
  mutation updateImage($file: Upload!) {
    updateImage(file: $file)
  }
`
