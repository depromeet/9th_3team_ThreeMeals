import React, { FC, useCallback, useState } from 'react'
import styled from 'styled-components'
import { AnswerContactType } from '../pages/AnswerDetailPage'
import {
  ChildrenComments,
  ParentComments,
  ChildrenCommentInfo,
  GET_CHILDREN_COMMENTS,
} from '../../lib/queries/getCommentsQueries'
import { useLazyQuery, useMutation, QueryResult } from '@apollo/client'
import dayjs from 'dayjs'
import { SVGS } from '../../constants/svgs'
import {
  CREATE_LIKE_COMMENT,
  createLikeCommentRes,
  createLikeCommentParams,
} from '../../lib/queries/createQueries'
import {
  deleteLikeCommentRes,
  deleteLikeCommentParams,
  DELETE_LIKE_COMMENT,
} from '../../lib/queries/deleteQueries'
import { getPostById } from '../../lib/queries/getPostQueries'
interface Props {
  isMine: boolean
  profileImg: string
  postData: getPostById
  commentsInfo: ParentComments | undefined
  parentCommentsForRefetching: QueryResult<ParentComments, Record<string, any>>
  setParentCommentId: (commentId: string) => void
  onClickRemove?: (type: AnswerContactType, id: string) => void
}

type ChildrenCommentArr = Array<{
  parentId: string
  contents: Array<ChildrenCommentInfo>
}>

const PostComment: FC<Props> = (props) => {
  const [writeOpen, setWriteOpen] = useState(false)
  const [childrenOpen, setChildrenOpen] = useState<
    Array<{ index: number; value: boolean }>
  >([])
  const [childrenCommentsArr, setChildrenCommentsArr] =
    useState<ChildrenCommentArr>()
  const [curPostId, setCurPostId] = useState('')
  const [curParentCommentId, setCurParentCommentId] = useState('')
  const [
    getChildrenComments,
    { data: childrenComments, refetch: childrenCommentsRefetch },
  ] = useLazyQuery<ChildrenComments>(GET_CHILDREN_COMMENTS, {
    variables: {
      first: 10,
      postId: curPostId,
      parentId: curParentCommentId,
    },
    onCompleted: (data) => checkChildrenCommentsArr(data),
  })
  const postCommentData = props.commentsInfo?.getParentComments.edges
  const childrenCommentsData = childrenComments?.getChildrenComments.edges
  const checkChildrenCommentsArr = useCallback(
    (data: ChildrenComments) => {
      if (childrenCommentsArr === undefined) {
        return setChildrenCommentsArr([
          {
            parentId: curParentCommentId,
            contents: data.getChildrenComments.edges,
          },
        ])
      } else {
        const checkTakingCurChildrenCommentsOnArr = childrenCommentsArr.find(
          (childrenDataInfo) => childrenDataInfo.parentId === curParentCommentId
        )
        if (!checkTakingCurChildrenCommentsOnArr && childrenCommentsData) {
          setChildrenCommentsArr([
            ...childrenCommentsArr,
            {
              parentId: curParentCommentId,
              contents: data.getChildrenComments.edges,
            },
          ])
        }
        return
      }
    },
    [childrenCommentsData, childrenCommentsArr, curParentCommentId]
  )
  const handleWriteComment = useCallback(
    (commentId: string) => {
      setWriteOpen(!writeOpen)
      props.setParentCommentId(commentId)
    },
    [props, writeOpen]
  )
  const handleChildrenComments = useCallback(
    (commentId: string, postId: string, index: number) => {
      getChildrenComments({
        variables: { first: 10, parentId: commentId, postId: postId },
      })

      if (childrenOpen.find((childInfo) => childInfo.index === index)) {
        const newChildrenOpen = childrenOpen.map((childInfo) => {
          if (childInfo.index === index) {
            return { index: index, value: !childInfo.value }
          } else {
            return childInfo
          }
        })
        setChildrenOpen(newChildrenOpen)
      } else {
        setChildrenOpen([...childrenOpen, { index: index, value: true }])
      }
      setCurParentCommentId(commentId)
      setCurPostId(postId)
      props.setParentCommentId(commentId)
    },
    [childrenOpen, getChildrenComments, props]
  )
  const [createLikeComment] =
    useMutation<createLikeCommentRes, createLikeCommentParams>(
      CREATE_LIKE_COMMENT
    )
  const [deleteLikeComment] =
    useMutation<deleteLikeCommentRes, deleteLikeCommentParams>(
      DELETE_LIKE_COMMENT
    )
  const handleLikeActive = useCallback(
    (e, postId, commentId, likedComments) => {
      const { id } = e.target
      if (props.isMine) {
        if (likedComments.length > 0) {
          deleteLikeComment({
            variables: { postId: postId, commentId: commentId },
          }).then(() => {
            try {
              if (id === 'parent') {
                props.parentCommentsForRefetching.refetch()
              }
              if (id === 'children' && childrenCommentsRefetch !== undefined) {
                return childrenCommentsRefetch()
              }
            } catch (err) {
              console.log(err)
            }
          })
        } else {
          createLikeComment({
            variables: { postId: postId, commentId: commentId },
          }).then(() => {
            try {
              if (id === 'parent') {
                props.parentCommentsForRefetching.refetch()
              }
              if (id === 'children' && childrenCommentsRefetch !== undefined) {
                return childrenCommentsRefetch()
              }
            } catch (err) {
              console.log(err)
            }
          })
        }
      }
    },
    [
      childrenCommentsRefetch,
      createLikeComment,
      deleteLikeComment,
      props.isMine,
      props.parentCommentsForRefetching,
    ]
  )
  return (
    <AppContainer cardColor={props.postData.getPost.color}>
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
            <CommentFooter>
              <>
                <Write
                  className="write"
                  onClick={() => handleWriteComment(comment.node.id)}
                >
                  답글쓰기
                </Write>
                <LikeAction
                  className="likeActive"
                  onClick={(e) =>
                    handleLikeActive(
                      e,
                      comment.node.postId,
                      comment.node.id,
                      comment.node.likedComments
                    )
                  }
                  id="parent"
                  active={comment.node.likedComments.length > 0}
                >
                  좋아요
                </LikeAction>
                <ChildrenCommentsCnt
                  onClick={() =>
                    handleChildrenComments(
                      comment.node.id,
                      comment.node.postId,
                      i
                    )
                  }
                >
                  답글 {comment.node.childrenCount}개
                </ChildrenCommentsCnt>
              </>
            </CommentFooter>
            {childrenOpen.find(
              (childInfo) => childInfo.index === i && childInfo.value === true
            ) &&
              childrenCommentsArr?.map((childrenComments) => {
                if (comment.node.id === childrenComments.parentId) {
                  return childrenComments.contents.map((commentData) => {
                    return (
                      <ChildrenContainer key={commentData.node.id}>
                        <ProfileContainer>
                          <img
                            className="profileImg"
                            src={
                              commentData.node.account?.image ||
                              SVGS.icon_profileAltImg
                            }
                            alt="profileImg"
                          />
                          <ChildrenHeader>
                            <CommentId>
                              {commentData.node.account?.nickname}
                            </CommentId>
                          </ChildrenHeader>
                          {props.isMine && (
                            <DropMenu
                              onClick={() => {
                                props.onClickRemove &&
                                  props.onClickRemove(
                                    'grandChildren',
                                    commentData.node.id
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
                              {commentData.node.content}
                            </CommentContent>
                            <ChildrenFooter>
                              <LikeAction
                                onClick={(e) =>
                                  handleLikeActive(
                                    e,
                                    commentData.node.postId,
                                    commentData.node.id,
                                    commentData.node.likedComments
                                  )
                                }
                                id="children"
                                active={
                                  commentData.node.likedComments.length > 0
                                }
                              >
                                좋아요
                              </LikeAction>
                            </ChildrenFooter>
                          </ContentsContainer>
                        </BodyContainer>
                      </ChildrenContainer>
                    )
                  })
                }
              })}
          </CommentContainer>
        )
      })}
    </AppContainer>
  )
}

export default React.memo(PostComment)

interface AppContainerProps {
  cardColor: string
}

interface LikeActionProps {
  active: boolean
}

const AppContainer = styled.div<AppContainerProps>`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  background: rgba(255, 131, 61, 0.05);
  ${({ cardColor }) => `border: 2px solid ${cardColor};`}
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
  font-family: system-ui;
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
    width: 40px;
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
const LikeAction = styled.span<LikeActionProps>`
  cursor: pointer;
  margin-right: 15px;
  ${({ active }) => active && `color:#6799FE`}
`
const ChildrenCommentsCnt = styled.span`
  cursor: pointer;
`
