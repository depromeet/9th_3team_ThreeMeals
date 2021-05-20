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
