import React from 'react';
import fallback from '../fallback.png'

const MovieRow = (props) => {
    const handleClick = (e, id) => {
        window.location.href = `https://www.themoviedb.org/movie/${id}`
    }
    return (
        <div className="movie-row">
            <div>
                <img src={(props.movie.poster_path !== null) ? props.imageUrl : fallback} alt="poster"/>
            </div>
            <div className="movie-row-content">
                <p className="movie-title">{props.movie.title} | Popularity: {props.movie.popularity.toFixed(1)}% </p>
                <p> {props.movie.overview} </p>
                <input className="movie-button" type="button" value=" View More..."
                       onClick={(e) => handleClick(e, props.movie.id)}/>
            </div>
        </div>
    )
}

export default MovieRow