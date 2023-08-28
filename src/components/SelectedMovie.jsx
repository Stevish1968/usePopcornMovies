import { useEffect, useState } from 'react'
import StarRating from './StarRating'
import Loader from './Loader'

export default function SelectedMovie({ movieId, onCloseMovie, onAddWatched, watched }) {

    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [userRating, setUserRating] = useState('')

    const isWatched = watched.map((movie) => movie.imdbID).includes(movieId)
    const watchedUserRating = watched.find((movie) => movie.imdbID === movieId)?.userRating;

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie;


    const handleAdd = () => {
        const newWatchedMovie = {
            imdbID: movieId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: runtime.split(' ').at(0),
            userRating,
        }

        onAddWatched(newWatchedMovie)
        onCloseMovie()
    }

    useEffect(() => {
        if(!title) return
        document.title = `Movie | ${title}`

        return function() {
            document.title = 'usePopcorn'
        }
    },[title])


    useEffect(() => {
        async function getMovieDetail() {
            try {
                setIsLoading(true)
                const res = await fetch(`https://www.omdbapi.com/?apikey=b717c2e0&i=${movieId}`);
                const data = await res.json();
                setMovie(data);
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        }

        getMovieDetail();

    }, [movieId]);


    return (
        <div className='details'>
            {isLoading ? <Loader /> :
                <>
                    <header>
                        <button className='btn-back' onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster of ${movie}`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{released} &bull; {runtime}</p>
                            <p>{genre}</p>
                            <p><span>⭐</span>{imdbRating} IMDB rating</p>
                        </div>
                    </header>
                    <section>
                        <div className='rating'>

                            {!isWatched ? (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={3}
                                        onSetRating={setUserRating}
                                    />
                                    {userRating > 0 && (
                                        <button className='btn-add' onClick={handleAdd}>+ Add to list</button>
                                    )}
                                </>
                            ) : (
                                <p>You rated this movie {watchedUserRating}⭐</p>
                            )}
                        </div>




                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            }
        </div >
    )
}