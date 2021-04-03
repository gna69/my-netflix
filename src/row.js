import {useState, useEffect} from "react";

import axios from "./axios";
import {BASE_URL} from "./consts";
import styles from './row.module.css';

function Row({title, fetchUrl}) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(fetchUrl).then(response => {
            setMovies(response.data.results);
        });
    }, [fetchUrl]);

    console.table(movies);

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className={styles.row__posters}>
                {/* posters */}

                {movies.map((movie, idx) => (
                        <img className={styles.row__poster}
                             src={`${BASE_URL}${movie.poster_path}`}
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