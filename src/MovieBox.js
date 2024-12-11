import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import './App.css';

const API_IMG = "https://image.tmdb.org/t/p/w500/";

const MovieBox = ({ title, poster_path, vote_average, release_date, overview }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="card text-center bg-secondary mb-3 movie-card">
      <div className="card-body">
        <img
          className="card-img-top movie-poster"
          src={API_IMG + poster_path}
          alt={`${title} Poster`}
        />
        <div className="card-body">
          <button
            type="button"
            className="btn btn-dark btn-view-more"
            onClick={handleShow}
          >
            View More
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            className="movie-modal-poster"
            style={{ width: "14rem", marginBottom: "1rem" }}
            src={API_IMG + poster_path}
            alt={`${title} Poster`}
          />
          <h4>IMDb: ⭐ {vote_average}</h4>
          <h5>Release Date: {release_date}</h5>
          <hr />
          <h6>Overview</h6>
          <p>{overview}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MovieBox;
