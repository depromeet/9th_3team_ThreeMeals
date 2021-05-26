import * as React from 'react'
import { storiesOf } from '@storybook/react'
import PostComment, {
  ChildrenCommentInfo,
  CommentInfo,
} from '../../components/molecules/PostComment'
import { IMAGES } from '../../constants/images'
const dummyCommentData: CommentInfo[] = [
  {
    id: 'test123',
    content: '헐랭 너 누구냐? 그리고 나 너보다 안못생겼을걸..:(',
    secretType: 'Temp',
    account: {
      id: '1',
      nickname: '김덕배',
      providerId: '123',
      status: 'test',
      image: 'none',
      content: 'test',
      profileUrl: 'none',
      createdAt: '00:00:00',
      updatedAt: '00:00:00',
    },
    childrenCount: 1,
    pageInfo: {
      endCursor: '',
      hasNextPage: true,
    },
  },
  {
    id: 'test123',
    content: '헐랭 너 누구냐? 그리고 나 너보다 안못생겼을걸..:(',
    secretType: 'Temp',
    account: {
      id: '2',
      nickname: '김덕배',
      providerId: '123',
      status: 'test',
      image: 'none',
      content: 'test',
      profileUrl: 'none',
      createdAt: '00:00:00',
      updatedAt: '00:00:00',
    },
    childrenCount: 1,
    pageInfo: {
      endCursor: '',
      hasNextPage: true,
    },
  },
]

const dummyChildrenCommentData: ChildrenCommentInfo[] = [
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
      providerId: '123',
      status: 'test',
      image: 'none',
      content: 'test',
      profileUrl: 'none',
      createdAt: '00:00:00',
      updatedAt: '00:00:00',
    },
    postId: '2',
    parentId: '2',
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
      providerId: '123',
      status: 'test',
      image: 'none',
      content: 'test',
      profileUrl: 'none',
      createdAt: '00:00:00',
      updatedAt: '00:00:00',
    },
    postId: '2',
    parentId: '2',
  },
]

storiesOf('molecules/PostComment', module).add('with text', () => {
  return (
    <div style={{ width: '327px' }}>
      <PostComment
        profileImg={IMAGES.background}
        commentsInfo={dummyCommentData}
        childrenCommentInfo={dummyChildrenCommentData}
      />
    </div>
  )
})
