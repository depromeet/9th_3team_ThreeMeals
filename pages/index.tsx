import { GetServerSideProps } from 'next'
import cookies from 'next-cookies'
import _isEmpty from 'lodash-es/isEmpty'

import dynamic from 'next/dynamic'

const DynamicHomePage = dynamic(
  () => import('../src/components/pages/HomePage')
)

interface Props {
  id?: string
}

const Home: React.FC<Props> = (prop) => {
  return <DynamicHomePage />
}

export default Home

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = cookies(ctx).token

  if (!_isEmpty(token)) {
    ctx.res.writeHead(302, { Location: '/content' })
    ctx.res.end()
  }

  return {
    props: {},
  }
}
