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



export default function App() {

  const [movies, setMovies] = useState([]);
  //const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(() => {
    const saveWatched = localStorage.getItem('watched');
    return saveWatched ? JSON.parse(saveWatched) : [];
  });
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const [movieId, setMovieId] = useState(null);

  function handleMovieSelect(id) {
    setMovieId((movieId) => (id === movieId ? null : id))
  }

  function onCloseMovie() {
    setMovieId(null)
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie])
    // localStorage.setItem('watched', JSON.stringify([...watched, movie]))
  }


  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }




  useEffect(() =>{
    localStorage.setItem('watched', JSON.stringify(watched))
  },[watched])

  useEffect(() =>{

    function callback(e) {
        if(e.code === 'Escape'){
          onCloseMovie()
        }
    }

    document.addEventListener('keydown', callback)

    return function() {
      document.removeEventListener('keydown', callback)
    }
  })


  useEffect(() => {

    const controller = new AbortController();

    async function getMovies() {
      try {

        setIsLoading(true)
        setErrors('')

        const res = await fetch(`https://www.omdbapi.com/?apikey=b717c2e0&s=${query}`, { signal: controller.signal })

        if (!res.ok) throw new Error('Something went wrong while fetching')

        const data = await res.json()

        if (data.Response === 'False') throw new Error('Movie not found')

        setMovies(data.Search)
        setErrors('')
      } catch (err) {
        if (err.name !== "AbortError") {
          setErrors(err.message)
        }
      } finally {
        setIsLoading(false)
      }

      if (query.length < 3) {
        setMovies([])
        setErrors('')
        return
      }
    }

    onCloseMovie()
    getMovies()

    return function () {
      controller.abort()
    }
  },
    [query])


  return (
    <>
      <NavBar>
        <Search setQuery={setQuery} query={query} />
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

          {movieId ? <SelectedMovie movieId={movieId} onCloseMovie={onCloseMovie} onAddWatched={handleAddWatched} watched={watched} />
            :
            <>
              <WatchedSummery watched={watched} />
              <WatchedList watched={watched} removeMovie={handleDeleteWatched} />
            </>
          }
        </Box>
      </Main>
    </>
  );
}

