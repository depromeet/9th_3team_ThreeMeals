import React, { FC, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useLazyQuery } from '@apollo/client'
import { GET_CHILDREN_COMMENTS } from '../../lib/queries/getQueries'
interface Props {
  profileImg: string
  commentsInfo: CommentInfo[]
  childrenCommentInfo: ChildrenCommentInfo[]
}

export interface CommentInfo {
  id: string // parent or postId
  content: string
  secretType: string
  account: Account
  childrenCount: number
  pageInfo: {
    endCursor: string
    hasNextPage: boolean
  }
}

export interface ChildrenCommentInfo {
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
  providerId: string
  status: string
  image: string
  content: string
  profileUrl: string
  createdAt: string
  updatedAt: string
}
const PostComment: FC<Props> = (props) => {
  const [writeOpen, setWriteOpen] = useState(false)
  const handleWriteComment = useCallback(() => {
    setWriteOpen(!writeOpen)
  }, [writeOpen])
  const handleLikeActive = useCallback(() => {
    // mutation : createLikeChildrenComment
  }, [])

  return (
    <AppContainer>
      {props.commentsInfo.map((comment, i) => {
        return (
          <CommentContainer key={i}>
            <CommentHeader>
              <CommentId>{comment.id}</CommentId>
              <DropMenu>•••</DropMenu>
            </CommentHeader>
            <CommentContent>{comment.content}</CommentContent>
            <CommentFooter>
              <Write className="write" onClick={handleWriteComment}>
                답글쓰기
              </Write>
              <LikeAction className="likeActive" onClick={handleLikeActive}>
                좋아요
              </LikeAction>
            </CommentFooter>
            {props.childrenCommentInfo.map((childrenComment, i) => {
              if (comment.account.id === childrenComment.postId) {
                return (
                  <ChildrenContainer key={i}>
                    <ProfileContainer>
                      <img
                        className="profileImg"
                        src={props.profileImg}
                        alt="profileImg"
                      />
                      <ChildrenHeader>
                        <CommentId>
                          {childrenComment.account.nickname}
                        </CommentId>
                      </ChildrenHeader>
                      <DropMenu>•••</DropMenu>
                    </ProfileContainer>
                    <BodyContainer>
                      <ContentsContainer>
                        <CommentContent>{comment.content}</CommentContent>
                        <ChildrenFooter>
                          <Write onClick={handleWriteComment}>답글쓰기</Write>
                          <LikeAction onClick={handleLikeActive}>
                            좋아요
                          </LikeAction>
                        </ChildrenFooter>
                      </ContentsContainer>
                    </BodyContainer>
                  </ChildrenContainer>
                )
              }
            })}
          </CommentContainer>
        )
      })}
    </AppContainer>
  )
}

export default PostComment

const AppContainer = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  background: rgba(255, 131, 61, 0.05);
  border: 2px solid #ff833d;
  border-radius: 24px;
  margin-left: 5%;
  margin-right: 5%;
`

const CommentContainer = styled.div`
  margin-top: 24px;
`

const CommentHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  font-family: SF Pro Display;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  letter-spacing: -0.02em;

  color: #ffffff;
`

const CommentId = styled.div``
const CommentContent = styled.div`
  margin-top: 8px;
  margin-bottom: 12px;
  font-family: Apple SD Gothic Neo;
  font-style: normal;
  font-size: 15px;
  font-weight: normal;
  line-height: 24px;
  /* or 160% */

  letter-spacing: -0.02em;

  color: #ffffff;
`

const CommentFooter = styled.div`
  border-bottom: 1px solid rgba(125, 125, 125, 0.5);
  padding-bottom: 25px;
  color: #999999;
  font-size: 13px;
`

const ChildrenContainer = styled.div``
const ChildrenHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-left: 12px;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  letter-spacing: -0.02em;

  color: #ffffff;
  margin-top: 2px;
`
const ProfileContainer = styled.div`
  margin-top: 24px;
  display: flex;
  .profileImg {
    width: 32px;
    height: 32px;
    border-radius: 40%;
  }
  flex-direction: row;
`
const BodyContainer = styled.div`
  color: white;
`
const ContentsContainer = styled.div`
  border-bottom: 1px solid rgba(125, 125, 125, 0.5);
  margin-left: 44px;
`

const ChildrenFooter = styled.div`
  padding-bottom: 25px;
  font-size: 13px;
  display: flex;
  align-items: center;
  color: #999999;
`
const DropMenu = styled.div`
  cursor: pointer;
  letter-spacing: -5px;
  color: #999999;
`

const Write = styled.span`
  cursor: pointer;
  margin-right: 15px;
`
const LikeAction = styled.span`
  cursor: pointer;
`
