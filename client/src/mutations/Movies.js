const { gql } = require('@apollo/client');

export const newMoviesMutation = gql`
  mutation ($title: String!, $description: String, $year: Int!, $directorId: String!) {
    addMovie(title: $title, description: $description, year: $year, directorId: $directorId) {
      title
    }
  }
`;
