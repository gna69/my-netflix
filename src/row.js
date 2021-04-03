import {useState, useEffect} from "react";

import axios from "./axios";
import {BASE_URL} from "./consts";
import styles from './row.module.css';

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(fetchUrl).then(response => {
            setMovies(response.data.results);
        });
    }, [fetchUrl]);

    return (
        <div className={styles.row}>
            <h2>{title}</h2>

            <div className={styles.row__posters}>
                {/* posters */}

                {movies.map((movie, idx) => (
                        <img className={`${styles.row__poster} ${isLargeRow && styles.row__posterLarge}`}
                             src={`${BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                             alt={movie.name}
                             key={idx}/>
                    )
                )}
            </div>
            {/* container -> posters */}
        </div>
    );
}

export default Row;