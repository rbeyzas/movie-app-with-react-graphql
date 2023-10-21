import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { getDirectorsQuery } from '../queries/DirectorsList';

const NewMovieForm = () => {
  const [state, setState] = useState({
    title: '',
    description: '',
    year: null,
    directorId: '',
  });
  const onChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const { loading, error, data } = useQuery(getDirectorsQuery);

  if (loading) return <option disabled={true}>Loading...</option>;
  if (error) return <option disabled={true}>Error</option>;

  return (
    <div>
      <form>
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
            {loading && <option disabled={true}>Loading...</option>}
            {error && <option disabled={true}>Error.</option>}
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
