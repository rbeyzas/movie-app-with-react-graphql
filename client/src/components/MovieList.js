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
    variables: { id: activeId },
  });

  const showModal = (id) => {
    setActiveId(id);
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
        title="Basic Modal"
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
              <p>{movieData.movie.description}</p>
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
