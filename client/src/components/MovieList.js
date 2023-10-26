import React, { useState } from 'react';
import 'antd/dist/antd';
import { useQuery } from '@apollo/client';
import { getMoviesQuery, getMovieQuery } from '../queries/Movies';
import { Button, Modal } from 'antd';

const MovieList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState('');
  const { loading: loadingMovies, error: errorMovies, data: moviesData } = useQuery(getMoviesQuery);
  const {
    loading: loadingMovie,
    error: errorMovie,
    data: movieData,
  } = useQuery(getMovieQuery, {
    skip: !activeId,
    variables: { id: String(activeId) },
  });

  const showModal = (id) => {
    setActiveId(String(id));
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="container" data-state="Movie App">
      <Modal
        title="Detail"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <div>
          {loadingMovie && <div>Loading...</div>}
          {errorMovie && <div>Error</div>}
          {movieData && (
            <div>
              <h3>{movieData.movie.title}</h3>
              <p>{movieData.movie.year}</p>
              <p>{movieData.movie.description}</p>
              <h4>{movieData.movie.director.name}</h4>
              <h4>Yönetmenin filmleri:</h4>
              {movieData.movie.director.movies.map((movie) => (
                <div>{movie.title}</div>
              ))}
            </div>
          )}
        </div>
      </Modal>

      <div className="device" data-view="list">
        <ul className="movie-list layer" data-layer="list">
          {loadingMovies && <div>Loading...</div>}
          {errorMovies && <div>Error.</div>}
          {moviesData &&
            moviesData.movies.map(({ id, title, description }) => (
              <li className="content" key={id} onClick={() => showModal(id)}>
                <div className="bg"></div>
                <div className="avatar"></div>
                <div className="title">{title}</div>
                <p>{description}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieList;
