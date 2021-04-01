import Head from 'next/head';
import { useQuery } from '@apollo/client';
import QUERY_COUNTRIES from './queryCountries.graphql';
import styled from 'styled-components';

export default function Home() {
  const { data, loading, error } = useQuery(QUERY_COUNTRIES);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>:( an error happened</p>;
  }

  return (
    <div>
      <Head>
        <title>Three_Meals</title>
      </Head>
      <h1>Three_Meals</h1>
      <StyledButton>styled Btn</StyledButton>
      <div>
        {data.countries.map((country) => (
          <div key={country._id}>{country.name}</div>
        ))}
      </div>
    </div>
  );
}

const StyledButton = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  color: gray;
  backgroud: white;
`;
