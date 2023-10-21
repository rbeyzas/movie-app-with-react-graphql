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
  const { loading: queryLoading, error: queryError, data } = useQuery(getDirectorsQuery);
  const [addMovie, { loading, error }] = useMutation(newMoviesMutation);

  const onSubmit = (e) => {
    e.preventDefault();
    addMovie({
      variables: {
        title: state.title,
        description: state.description,
        year: parseInt(state.year, 10),
        directorId: state.directorId,
      },
      refetchQueries: [{ query: getMoviesQuery }],
    });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title</label>
          <input type="text" name="title" onChange={onChange} placeholder="Title" />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" onChange={onChange} placeholder="Description" />
        </div>
        <div>
          <label>Year</label>
          <input type="text" name="year" onChange={onChange} placeholder="Year" />
        </div>
        <div>
          <label>Director</label>
          <select name="directorId" onChange={onChange}>
            <option disabled={true}>Choose Director</option>
            {queryLoading && <option disabled={true}>Loading...</option>}
            {queryError && <option disabled={true}>Error.</option>}
            {data &&
              data.directors.map(({ id, name }) => (
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
  );
};

export default NewMovieForm;
