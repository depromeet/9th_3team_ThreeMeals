import React, { FC, useMemo } from 'react'
import Header from '../molecules/Header'
import { IMAGES } from '../../constants/images'
import styled from 'styled-components'
import AlarmContentField from '../molecules/AlarmContentField'
import { getMyAccountInfo } from '../../lib/queries/meQueries'
import { GetNotification } from '../../lib/queries/getQueries'
import { SpacingText } from '../../utils/SpacingText'
interface Props {
  myAccount?: getMyAccountInfo
  profileImage?: string
  notification?: GetNotification[]
  onClickLeft?: () => void
}

const NotificationTemplate: FC<Props> = (props) => {
  const profileImage = useMemo(() => {
    return props.myAccount?.getMyAccountInfo.image
  }, [props.myAccount?.getMyAccountInfo.image])

  const notificationData = useMemo(() => {
    return (
      props.notification &&
      props.notification
        .slice()
        // .reverse()
        .map((value, index) => {
          return (
            <AlarmContentField
              key={index}
              otherContentInfo={
                value.otherAccount !== null
                  ? {
                      accountId: value.otherAccount.id,
                      nickname: value.otherAccount.nickname,
                      postId: value.relatedPost.id,
                      postType: value.relatedPost.postType,
                      isLikeNotiType: value.notificationType === 'LikeToMine',
                    }
                  : undefined
              }
              content={value.relatedPost.content}
              contentType={value.relatedPost.postType}
              time={value.createdAt}
              myNickName={props.myAccount?.getMyAccountInfo.nickname}
            />
          )
        })
        .filter((item) => item)
    )
  }, [props.myAccount?.getMyAccountInfo, props.notification])

  return (
    <AppContainer>
      <Header
        isLogin={props.myAccount ? true : false}
        profileImage={profileImage}
        leftIcon={IMAGES.icon_24_back_wh}
        rightIcon={IMAGES.icon_24_drawer}
        rightSecondIcon={IMAGES.icon_24_alram_wh}
        onClickLeft={props.onClickLeft}
      />

      <MainContainer>
        <TapesContainer>
          <img
            src={IMAGES.tape_notification}
            alt="tape_contact"
            width={'100%'}
          />
          <ContentContainer>
            {notificationData && notificationData.length > 0 ? (
              notificationData
            ) : (
              <EmptyContainer>
                <EmptyText>
                  {SpacingText(
                    '?????? ????????? ?????????! \\n????????? ?????? ?????? ??????????????????!'
                  )}
                </EmptyText>
                <BackgroundSticker src={IMAGES.backgroundSticker} />
              </EmptyContainer>
            )}
          </ContentContainer>
        </TapesContainer>
      </MainContainer>
    </AppContainer>
  )
}

export default NotificationTemplate

const AppContainer = styled.div`
  color: #ffffff;
  max-width: 500px;
  width: 100%;
  margin-top: 10px;
`

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  height: calc(100vh - 64px);
`

const TapesContainer = styled.div`
  width: 100%;
  height: 100%;
`

const ContentContainer = styled.div`
  padding: 0 10px;
  margin-top: 10px;
  height: 100%;
`
const EmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`

const EmptyText = styled.div`
  flex: 1;
  height: 50%;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 22px;
  /* or 169% */

  text-align: center;
  letter-spacing: -0.02em;

  color: rgba(255, 255, 255, 0.7);
`

const BackgroundSticker = styled.img`
  position: fixed;
  width: 214px;
  height: 191px;
  bottom: 15px;
  right: 15px;
`
