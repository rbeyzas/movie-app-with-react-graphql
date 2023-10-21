import React from 'react';
import { gql, useQuery } from '@apollo/client';

const getMoviesQuery = gql`
  {
    movies {
      title
      description
    }
  }
`;

const MovieList = () => {
  const { loading, error, data } = useQuery(getMoviesQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(data);

  return (
    <div>
      <ul className="movie-list">
        <li>Lorem ipsum</li>
      </ul>
    </div>
  );
};

export default MovieList;
