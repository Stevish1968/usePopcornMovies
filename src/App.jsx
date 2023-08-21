import { useState } from "react";
import NavBar from './components/navbar/NavBar'
import Box from './components/Box'
import Search from './components/navbar/Search'
import NumResults from './components/navbar/NumResults'
import Main from './components/Main'
import MovieList from './components/MovieList'
import WatchedSummery from "./components/WatchedSummery"
import WatchedList from "./components/WatchedList"
import { useEffect } from 'react'
import Loader from './components/Loader'
import ErrorMessage from "./components/ErrorMessages";
import SelectedMovie from './components/SelectedMovie'

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];


export default function App() {

  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const [movieId, setMovieId] = useState(null);


  useEffect(() => function () {
    async function getMovies() {
      try {

        setIsLoading(true)
        setErrors('')
        const res = await fetch(`https://www.omdbapi.com/?apikey=b717c2e0&s=${query}`)

        if (!res.ok) throw new Error('Something went wrong while fetching')

        const data = await res.json()

        if (data.Response === 'False') throw new Error('Movie not found')

        setMovies(data.Search)

      } catch (err) {
        setErrors(err.message)
      } finally {
        setIsLoading(false)
      }
      if (query.length < 3) {
        setMovies([])
        setErrors('')
        return
      }
    }
    getMovies()
  }, [query])

  function handleMovieSelect(id) {
   setMovieId((movieId) => (id === movieId ?  null : id  ))
  }

  function onCloseMovie() {
    setMovieId(null)
  }

  return (
    <>
      <NavBar>
        <Search setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : errors ? (
            <ErrorMessage message={errors} />
          ) : (
            <MovieList movies={movies} handleMovieSelect={handleMovieSelect} />
          )}

        </Box>
        <Box>

          {movieId ? <SelectedMovie movieId={movieId} onClick={onCloseMovie} />
            :
            <>
              <WatchedSummery watched={watched} />
              <WatchedList watched={watched} />
            </>
          }
        </Box>
      </Main>
    </>
  );
}

