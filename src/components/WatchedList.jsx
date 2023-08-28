import WatchedMovie from './WatchedMovie'

function WatchedList({watched, removeMovie}) {
    return (
        <ul className="list">
                {watched.map((movie) => (
                 <WatchedMovie movie={movie} k key={movie.imdbID} removeMovie={()=>removeMovie(movie.imdbID)} />
                ))}
              </ul>
    )
}

export default WatchedList