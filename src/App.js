import React, { useEffect, useState } from 'react';
import './App.css';
import MovieBox from './MovieBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Form, FormControl, Container } from 'react-bootstrap';

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
  const [movies, setMovies] = useState([]);
  const [heroImage, setHeroImage] = useState(null); // Hero image URL
  //const [featuredTitle, setFeaturedTitle] = useState(''); // Featured movie title
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);

        // Set the hero image and title using the first movie
        if (data.results.length > 0) {
          const firstMovie = data.results[0];
          setHeroImage(`https://image.tmdb.org/t/p/original${firstMovie.backdrop_path}`);
          //setFeaturedTitle(firstMovie.title || 'Discover Movies');
        }
      });
  }, [API_URL]);

  const searchMovie = async (e) => {
    e.preventDefault();
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" variant="dark" bg="dark" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/home">🎥 MovieHub</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto" navbarScroll></Nav>
            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <FormControl
                type="search"
                placeholder="Search for movies..."
                className="me-2"
                aria-label="Search"
                value={query}
                onChange={changeHandler}
              />
              <Button variant="outline-light" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: heroImage
            ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroImage})`
            : 'none',
        }}
      >
        <Container className="text-center text-light">
          <h1 className="display-4">Welcome to MovieHub</h1>
          <p className="lead">Discover the latest trending movies and search for your favorites.</p>
        </Container>
      </div>

      {/* Movie Grid */}
      <Container className="my-5">
        {movies.length > 0 ? (
          <div className="grid">
            {movies.map((movie) => (
              <MovieBox key={movie.id} {...movie} />
            ))}
          </div>
        ) : (
          <h2 className="text-center">Sorry! No Movies Found</h2>
        )}
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3">
        <p>&copy; 2024 MovieHub. Built with ❤️ using React and The Movie Database (TMDb) API.</p>
      </footer>
    </>
  );
}

export default App;

