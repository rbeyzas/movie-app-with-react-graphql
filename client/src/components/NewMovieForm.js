import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { getDirectorsQuery } from '../queries/Directors';
import { newMoviesMutation } from '../mutations/Movies';
import { getMoviesQuery } from '../queries/Movies';

const NewMovieForm = () => {
  const [state, setState] = useState({
    title: '',
    description: '',
    year: '',
    directorId: '',
  });
  const onChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const {
    loading: directorsLoading,
    error: directorsError,
    data: directorsData,
  } = useQuery(getDirectorsQuery);
  const [addMovie, { loading: mutationLoading, error: mutationError }] = useMutation(
    newMoviesMutation,
    {
      refetchQueries: [{ query: getMoviesQuery }],
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie({
      variables: {
        title: state.title,
        description: state.description,
        year: parseInt(state.year, 10),
        directorId: state.directorId,
      },
    });
  };
  return (
    <div className="container" data-state="New Movie">
      <div className="device" data-view="list">
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" name="title" onChange={onChange} placeholder="Title" />
          </div>
          <div>
            <textarea name="description" onChange={onChange} placeholder="Description" />
          </div>
          <div>
            <input type="text" name="year" onChange={onChange} placeholder="Year" />
          </div>
          <div>
            <select name="directorId" onChange={onChange}>
              <option disabled={true}>Choose Director</option>
              {directorsLoading && <option disabled={true}>Loading...</option>}
              {directorsError && <option disabled={true}>Error.</option>}
              {directorsData &&
                directorsData.directors.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      {mutationLoading && <div>Loading...</div>}
      {mutationError && <div>Error!</div>}
    </div>
  );
};

export default NewMovieForm;
