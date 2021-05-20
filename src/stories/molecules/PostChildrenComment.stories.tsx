import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import PostChildrenComment from '../../components/molecules/PostChildrenComment'
import { IMAGES } from '../../constants/images'
const dummyChildrenCommentData = [
  {
    id: 'test123',
    content: '헐랭 너 누구냐? 그리고 나 너보다 안못생겼을걸..:(',
    secretType: 'Temp',
    commentState: 'Submitted',
    createdAt: '09:32:03',
    updatedAt: '09:44:02',
    account: {
      id: '1234',
      nickname: '김덕배',
      //   provider: !Provider
      providerId: '123',
      status: 'test',
      image: 'none',
      content: 'test',
      profileUrl: 'none',
      createdAt: '00:00:00',
      updatedAt: '00:00:00',
    },
    postId: 'test123',
    parentId: 'test123',
  },
  {
    id: 'test123',
    content: '헐랭 너 누구냐? 그리고 나 너보다 안못생겼을걸..:(',
    secretType: 'Temp',
    commentState: 'Submitted',
    createdAt: '09:32:03',
    updatedAt: '09:44:02',
    account: {
      id: '1234',
      nickname: '김덕배',
      //   provider: !Provider
      providerId: '123',
      status: 'test',
      image: 'none',
      content: 'test',
      profileUrl: 'none',
      createdAt: '00:00:00',
      updatedAt: '00:00:00',
    },
    postId: 'test123',
    parentId: 'test123',
  },
]

storiesOf('molecules/PostChildrenComment', module).add('with text', () => {
  return (
    <div style={{ width: '327px' }}>
      <PostChildrenComment
        profileImg={IMAGES.background}
        commentsInfo={dummyChildrenCommentData}
      />
    </div>
  )
})
