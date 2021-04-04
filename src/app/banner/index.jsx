import {useEffect, useState} from "react";
import axios from "../../axios";
import requests from "../../requests";
import {BASE_URL} from "../../consts";
import styles from './banner.module.css';

function Banner() {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        axios.get(requests.fetchNetflixOriginals).then(response => {
            setMovie(response.data.results[Math.floor(Math.random() * response.data.results.length - 1)]);
        });
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }

    return (
        <header className={styles.banner} style={{
            backgroundSize: "cover",
            backgroundImage: `url(${BASE_URL}${movie?.backdrop_path})`,
            backgroundPosition: "center center"
        }}>
            <div className={styles.banner__contents}>
                <h1 className={styles.banner__title}>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="banner__buttons">
                    <button className={styles.banner__button}>Play</button>
                    <button className={styles.banner__button}>My List</button>
                </div>

                <h1 className={styles.banner__description}>
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            <div className={styles.banner__fadeBottom} />
        </header>
    );
}

export default Banner;