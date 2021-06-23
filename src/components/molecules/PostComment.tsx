import React, { FC, useCallback, useState } from 'react'
import styled from 'styled-components'
import { AnswerContactType } from '../pages/AnswerDetailPage'
import {
  ChildrenComments,
  ParentComments,
  GET_CHILDREN_COMMENTS,
} from '../../lib/queries/getCommentsQueries'
import { useLazyQuery } from '@apollo/client'
import dayjs from 'dayjs'
import { SVGS } from '../../constants/svgs'
interface Props {
  isMine: boolean
  profileImg: string
  commentsInfo: ParentComments | undefined
  setParentCommentId: (commentId: string) => void
  onClickRemove?: (type: AnswerContactType, id: string) => void
}

const PostComment: FC<Props> = (props) => {
  const [writeOpen, setWriteOpen] = useState(false)
  const [childrenOpen, setChildrenOpen] = useState(false)
  const [curPostId, setCurPostId] = useState('')
  const [curParentCommentId, setCurParentCommentId] = useState('')
  const [getChildrenComment, { data: childrenComments }] =
    useLazyQuery<ChildrenComments>(GET_CHILDREN_COMMENTS, {
      variables: {
        first: 10,
        postId: curPostId,
        parentId: curParentCommentId,
      },
    })
  const postCommentData = props.commentsInfo?.getParentComments.edges
  const childrenCommentData = childrenComments?.getChildrenComments.edges
  const handleWriteComment = useCallback(
    (commentId: string) => {
      setWriteOpen(!writeOpen)
      props.setParentCommentId(commentId)
    },
    [props, writeOpen]
  )
  const handleLikeActive = useCallback(() => {
    // mutation : createLikeChildrenComment
  }, [])
  const handleChildrenComment = useCallback(
    (commentId: string, postId: string) => {
      getChildrenComment({
        variables: { first: 10, parentId: commentId, postId: postId },
      })
      setChildrenOpen(!childrenOpen)
      setCurParentCommentId(commentId)
      setCurPostId(postId)
      props.setParentCommentId(commentId)
    },
    [childrenOpen, getChildrenComment, props]
  )
  return (
    <AppContainer>
      {postCommentData?.map((comment, i) => {
        return (
          <CommentContainer key={i}>
            <CommentHeader>
              <CommentDate>
                {dayjs(comment.node.createdAt).format('HH:mm:ss')}
              </CommentDate>
              {props.isMine && (
                <DropMenu
                  onClick={() => {
                    props.onClickRemove &&
                      props.onClickRemove('children', comment.node.id)
                  }}
                >
                  •••
                </DropMenu>
              )}
            </CommentHeader>
            <CommentContent>{comment.node.content}</CommentContent>
            {props.isMine && (
              <CommentFooter>
                <>
                  <Write
                    className="write"
                    onClick={() => handleWriteComment(comment.node.id)}
                  >
                    답글쓰기
                  </Write>
                  <LikeAction className="likeActive" onClick={handleLikeActive}>
                    좋아요
                  </LikeAction>
                  <ChildrenCommentCnt
                    onClick={() =>
                      handleChildrenComment(
                        comment.node.id,
                        comment.node.postId
                      )
                    }
                  >
                    답글 {comment.node.childrenCount}개
                  </ChildrenCommentCnt>
                </>
              </CommentFooter>
            )}
            {childrenOpen &&
              childrenCommentData?.map((childrenComment, i) => {
                if (comment.node.id === childrenComment.node.parentId) {
                  return (
                    <ChildrenContainer key={i}>
                      <ProfileContainer>
                        <img
                          className="profileImg"
                          src={
                            childrenComment.node.account?.profileUrl ||
                            SVGS.icon_profileAltImg
                          }
                          alt="profileImg"
                        />
                        <ChildrenHeader>
                          <CommentId>
                            {childrenComment.node.account?.nickname}
                          </CommentId>
                        </ChildrenHeader>
                        {props.isMine && (
                          <DropMenu
                            onClick={() => {
                              props.onClickRemove &&
                                props.onClickRemove(
                                  'grandChildren',
                                  childrenComment.node.id
                                )
                            }}
                          >
                            •••
                          </DropMenu>
                        )}
                      </ProfileContainer>
                      <BodyContainer>
                        <ContentsContainer>
                          <CommentContent>
                            {childrenComment.node.content}
                          </CommentContent>
                          {props.isMine && (
                            <ChildrenFooter>
                              <Write
                                onClick={() =>
                                  handleWriteComment(childrenComment.node.id)
                                }
                              >
                                답글쓰기
                              </Write>
                              <LikeAction onClick={handleLikeActive}>
                                좋아요
                              </LikeAction>
                            </ChildrenFooter>
                          )}
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

export default React.memo(PostComment)

const AppContainer = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  background: rgba(255, 131, 61, 0.05);
  border: 2px solid #ff833d;
  border-radius: 24px;
  margin-left: 5%;
  margin-right: 5%;
  width: 100%;
  max-width: 396px;
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
const CommentDate = styled.div``
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
  margin-right: 15px;
`
const ChildrenCommentCnt = styled.span`
  cursor: pointer;
`
