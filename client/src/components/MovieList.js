import React from 'react';
import { useQuery } from '@apollo/client';
import { getMoviesQuery } from '../queries/MoviesList';

const MovieList = () => {
  const { loading, error, data } = useQuery(getMoviesQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  //   console.log(data);

  return (
    <div>
      <ul className="movie-list">
        {data.movies.map((movie, index) => (
          <li key={index}>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p>{movie.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
