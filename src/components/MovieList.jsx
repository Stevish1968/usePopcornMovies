import Movie from './Movie'

function MovieList({movies, handleMovieSelect}) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
             <Movie  key={movie.imdbID} movie={movie} handleMovieSelect={handleMovieSelect}/>
            ))}
          </ul>
    )
}

export default MovieList