import { useEffect, useState } from 'react'
import StarRating from './StarRating'

export default function SelectedMovie({ movieId, onClick }) {

    const [movie, setMovie] = useState({})

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
    } = movie

    useEffect(() => function () {
        async function getMovieDetail() {
            const res = await fetch(`https://www.omdbapi.com/?apikey=b717c2e0&i=${movieId}`)
            //if (!res.ok) throw new Error('Something went wrong while fetching')
            const data = await res.json()
            setMovie(data)
        }
        getMovieDetail()
    }, [movieId])


    return (
        <div className='details'>
            <header>
                <button className='btn-back' onClick={onClick}>
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
                <StarRating maxRating={10} size={3} />
                <p><em>{plot}</em></p>
                <p>Starring {actors}</p>
                <p>Driected by {director}</p>
            </section>
        </div >
    )
}