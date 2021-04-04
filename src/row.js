import {useState, useEffect} from "react";

import axios from "./axios";
import {BASE_URL} from "./consts";
import styles from './row.module.css';
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        axios.get(fetchUrl).then(response => {
            setMovies(response.data.results);
        });
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    };

    const handleMovieClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl('');
        }
        else {
            movieTrailer(movie?.name || "").then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch(error => console.error(error))
        }
    }

    return (
        <div className={styles.row}>
            <h2>{title}</h2>

            <div className={styles.row__posters}>
                {/* posters */}

                {movies.map((movie, idx) => (
                        <img className={`${styles.row__poster} ${isLargeRow && styles.row__posterLarge}`}
                             src={`${BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                             alt={movie.name}
                             onClick={() => handleMovieClick(movie)}
                             key={idx}/>
                    )
                )}
            </div>

            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    );
}

export default Row;