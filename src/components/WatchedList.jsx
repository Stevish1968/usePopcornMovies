import WatchedMovie from './WatchedMovie'

function WatchedList({watched}) {
    return (
        <ul className="list">
                {watched.map((movie) => (
                 <WatchedMovie movie={movie} k key={movie.imdbID} />
                ))}
              </ul>
    )
}

export default WatchedList