import { FC } from 'react'
import Head from 'next/head'

interface Props {
  title?: string
  description?: string
  image?: string
}

const NextHead: FC<Props> = ({ title, description, image }) => {
  const ogTitle = title || 'hush-it'
  const ogSiteName = 'hush-it'
  const ogImage = image || '/ogimage.png'
  const ogType = 'website'

  const desc =
    description ||
    'MZ세대를 위한 소통플랫폼, 익명질문, OX질문, 답변받기, 스티커 카드, 스티커 캐릭터'
  const keywords =
    'hush,hush-it,허쉬,허쉬잇,MZ세대,질문,답변,익명,익명질문,스티커,OX질문,'

  return (
    <Head>
      <title>Hush-it</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />

      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />

      <meta property="og:title" content={ogTitle} />
      <meta property="og:site_name" content={ogSiteName} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content="https://hush-it.com/" />

      <meta
        name="google-site-verification"
        content="yaj6bnlmqVVhDCO_rvMvmNeQGaZqzoHIE7kYTngO2P8"
      />
      <meta
        name="naver-site-verification"
        content="4480351dcb07dd333511739e6a42ad4b0eddaff7"
      />

      <meta name="NaverBot" content="All" />
      <meta name="NaverBot" content="index,follow" />
      <meta name="Yeti" content="All" />
      <meta name="Yeti" content="index,follow" />

      <link rel="apple-touch-icon" href="/ogimage.png" />
      <link rel="canonical" href="https://hush-it.com/" />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        sizes="16x16 32x32 64x64"
        href="/favicon.ico"
      />
    </Head>
  )
}

export default NextHead
