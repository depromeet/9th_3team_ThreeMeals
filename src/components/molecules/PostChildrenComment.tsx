import React, { FC, useCallback, useState } from 'react'
import styled from 'styled-components'
import DefaultLine from '../atoms/DefaultLine'
import { useLazyQuery } from '@apollo/client'
import { GET_CHILDREN_COMMENTS } from '../../lib/queries/getQueries'
interface Props {
  profileImg: string
  commentsInfo: CommentInfo[]
}

interface CommentInfo {
  id: string
  content: string
  secretType: string
  commentState: string
  createdAt: string
  updatedAt: string
  account: Account
  postId: string
  parentId: string
}

interface Account {
  id: string
  nickname: string
  //   provider: !Provider
  providerId: string
  status: string
  image: string
  content: string
  profileUrl: string
  createdAt: string
  updatedAt: string
}
const PostChildrenComment: FC<Props> = (props) => {
  // const [getChildrenComments,{ loading, error, data }] = useLazyQuery(GET_CHILDREN_COMMENTS)
  const [writeOpen, setWriteOpen] = useState(false)
  const handleWriteComment = useCallback(() => {
    setWriteOpen(!writeOpen)
  }, [writeOpen])
  const handleLikeActive = useCallback(() => {
    // mutation : createLikeChildrenComment
  }, [])

  return (
    <AppContainer>
      <ProfileContainer>
        <img className="profileImg" src={props.profileImg} alt="profileImg" />
      </ProfileContainer>
      <BodyContainer>
        <div className="namespace">
          {props.commentsInfo[0]?.account.nickname}
        </div>
        {props.commentsInfo.map((comment, i) => {
          return (
            <>
              <ContentsContainer>
                <div className="header">
                  <span className="time">{comment.createdAt}</span>
                  <span className="dropMenu">•••</span>
                </div>
                <div className="content">{comment.content}</div>
                <div className="footer">
                  <span className="write" onClick={handleWriteComment}>
                    답글쓰기
                  </span>
                  <span className="likeActive" onClick={handleLikeActive}>
                    좋아요
                  </span>
                </div>
                <DefaultLine />
              </ContentsContainer>
            </>
          )
        })}
      </BodyContainer>
    </AppContainer>
  )
}

export default PostChildrenComment

const AppContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
`

const ProfileContainer = styled.div`
  width: 25%;
  padding: 25px 0;
  display: flex;
  justify-content: center;
  .profileImg {
    width: 32px;
    height: 32px;
    border-radius: 40%;
  }
`
const BodyContainer = styled.div`
  color: white;
  padding: 20px 0;
  .namespace {
    height: 30px;
    align-items: center;
    display: flex;
  }
`
const ContentsContainer = styled.div`
  border-bottom: 1px solid rgba(125, 125, 125, 0.5);
  .header {
    display: flex;
    justify-content: space-between;
    height: 60px;
    align-items: center;
    .dropMenu {
      letter-spacing: -5px;
      color: #999999;
    }
  }
  .content {
    line-height: 25px;
  }
  .footer {
    height: 60px;
    display: flex;
    align-items: center;
    color: #999999;
    .write {
      margin-right: 30px;
    }
  }
`
