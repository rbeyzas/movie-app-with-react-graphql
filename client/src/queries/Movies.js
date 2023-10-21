import { gql } from '@apollo/client';

export const getMoviesQuery = gql`
  {
    movies {
      id
      title
      description
    }
  }
`;

export const getMovieQuery = gql`
  query ($id: String) {
    movie(id: $id) {
      id
      title
      description
      director {
        name
        movies {
          title
        }
      }
    }
  }
`;
