import Head from 'next/head'
import { IMAGES } from '../src/constants/images'
import Link from 'next/link'

import NameLabel from '../src/components/atoms/NameLabel'

interface Props {
  id?: string
}

const Home: React.FC<Props> = (prop) => {
  return (
    <div>
      <Head>
        <title>Three_Meals</title>
      </Head>
      <h1>Three_Meals</h1>
      <img src={IMAGES.background} width={20} />
      <button
        onClick={() => {
          window.Kakao.Auth.authorize({
            redirectUri: `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/auth`,
          })
        }}
      >
        카카오로 로그인하기
      </button>
      <button
        onClick={() => {
          if (navigator.share) {
            navigator
              .share({
                title: 'web.dev',
                text: 'Check out web.dev.',
                url: 'https://www.naver.com/',
              })
              .then(() => console.log('Successful share'))
              .catch((error) => console.log('Error sharing', error))
          }
        }}
      >
        공유하기
      </button>
      {prop.id && prop.id}

      <div style={{ display: 'flex' }}>
        <Link href="/profile">
          <a>profile</a>
        </Link>
        <NameLabel text="한영수" />
      </div>
    </div>
  )
}

export default Home
