const { gql } = require('@apollo/client');

export const getDirectorsQuery = gql`
  {
    directors {
      id
      name
    }
  }
`;
