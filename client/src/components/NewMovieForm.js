import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { getDirectorsQuery } from '../queries/Directors';
import { newMovieMutation } from '../mutations/Movies';
import { getMoviesQuery } from '../queries/Movies';

const NewMovieForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    directorId: '',
  });

  const {
    data: directorsData,
    loading: loadingDirectors,
    error: errorDirectors,
  } = useQuery(getDirectorsQuery);

  const [addMovie, { loading: mutationLoading, error: mutationError }] = useMutation(
    newMovieMutation,
    {
      refetchQueries: [{ query: getMoviesQuery }],
    },
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    addMovie({
      variables: {
        title: formData.title,
        description: formData.description,
        year: parseInt(formData.year, 10),
        directorId: formData.directorId,
      },
    });
  };
  return (
    <div className="container" data-state="New Movie">
      <div className="device" data-view="list">
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" name="title" onChange={handleChange} placeholder="Title" />
          </div>
          <div>
            <textarea name="description" onChange={handleChange} placeholder="Description" />
          </div>
          <div>
            <input type="text" name="year" onChange={handleChange} placeholder="Year" />
          </div>
          <div>
            <select name="directorId" onChange={handleChange}>
              <option disabled>Choose Director</option>
              {loadingDirectors ? (
                <option disabled>Loading...</option>
              ) : errorDirectors ? (
                <option disabled>Error.</option>
              ) : (
                directorsData.directors.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))
              )}
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
