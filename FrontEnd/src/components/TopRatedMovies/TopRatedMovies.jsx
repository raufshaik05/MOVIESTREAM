
import React, { useEffect, useState } from "react";
import axios from "axios";
import MainMovies from "../MainMoviesCards/MainMovies";
import "./TopRated.css";

function TopRated() {

    const [topRatedMovies, setTopRatedMovies] = useState([]);

    useEffect(() => {
        getTopRatedMovies();
    }, []);

    async function getTopRatedMovies() {

        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/MainMovieCard?page=1&limit=10`
            );

            const movies = response.data.movies || response.data;

            const sortedMovies = [...movies]
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 5);

            setTopRatedMovies(sortedMovies);

        } catch (error) {

            console.log("Top Rated Error:", error);

        }
    }

    return (

        <section className="top-rated-section">

            <div className="top-rated-title">
                <h2>⭐ Top Rated</h2>
                <button>See All →</button>
            </div>

            <div className="top-rated-cards">

                {topRatedMovies.map((movie) => (

                    <MainMovies
                        key={movie._id}
                        movie={movie}
                    />

                ))}

            </div>

        </section>

    );
}

export default TopRated;