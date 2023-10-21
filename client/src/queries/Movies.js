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
