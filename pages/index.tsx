import Head from 'next/head';
import { useQuery } from '@apollo/client';
import QUERY_COUNTRIES from './queryCountries.graphql';
import styled from 'styled-components';
import { IMAGES } from '../src/constants/images';

interface Props {
  id?: string;
}
type conturies = {
  _id: string;
  name: string;
};

const Home: React.FC<Props> = (prop) => {
  const { data, loading, error } = useQuery(QUERY_COUNTRIES);

  if (loading) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>:( an error happened</p>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Three_Meals</title>
      </Head>
      <h1>Three_Meals</h1>
      <StyledButton>styled Btn</StyledButton>
      <img src={IMAGES.background} width={20} />
      <button
        onClick={() => {
          window.Kakao.Auth.authorize({
            redirectUri: 'http://localhost:3002/auth',
          });
        }}
      >
        카카오로 로그인하기
      </button>
      <div>
        {data.countries.map((country: conturies) => (
          <div key={country._id}>{country.name}</div>
        ))}
      </div>
      {prop.id && prop.id}
    </div>
  );
};

const StyledButton = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  color: gray;
  background: white;
`;

export default Home;
