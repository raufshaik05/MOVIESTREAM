import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newMoviesCarts.css";

function NewMoviesCarts() {

    const [newMovieData, setNewMovieData] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const navigate = useNavigate();


    // =========================================
    // FETCH ADMIN POSTED MOVIES
    // =========================================

    useEffect(() => {
        newMovieApi();
    }, []);


    async function newMovieApi() {

        try {

            const apiData = await axios.get(
                "http://localhost:8080/api/newMoviePostData?type=movie"
            );

            const movies = apiData.data.data || [];

            console.log("ADMIN MOVIES:", movies);

            setNewMovieData(movies);

            // Select first movie
            if (movies.length > 0) {
                setSelectedMovie(movies[0]);
            }

        } catch (error) {

            console.log(
                "ADMIN MOVIE API ERROR:",
                error.response?.data || error.message
            );

        }

    }


    return (
        <>

            {/* =========================================
                LATEST DROP
            ========================================= */}

            {selectedMovie && (

                <div className="latest-drop">


                    {/* =================================
                        HEADING
                    ================================= */}

                    <div className="latest-heading">

                        <span>
                            ✨
                        </span>

                        <h2>
                            LATEST DROP
                        </h2>

                    </div>


                    {/* =================================
                        FEATURED MOVIE
                    ================================= */}

                    <div className="latest-card">


                        {/* =================================
                            POSTER
                        ================================= */}

                        <div className="latest-poster">

                            <img
                                src={selectedMovie.image}
                                alt={selectedMovie.title}
                            />

                            <span className="new-release-poster">

                                NEW
                                <br />
                                RELEASE

                            </span>

                        </div>


                        {/* =================================
                            MOVIE DETAILS
                        ================================= */}

                        <div className="latest-details">


                            {/* NEW RELEASE BADGE */}

                            <span className="new-release-badge">

                                NEW RELEASE

                            </span>


                            {/* TITLE */}

                            <h1>

                                {selectedMovie.title}

                            </h1>


                            {/* =================================
                                MOVIE META
                            ================================= */}

                            <div className="latest-meta">


                                {/* RATING */}

                                <span className="rating">

                                    ⭐ {selectedMovie.rating}

                                </span>


                                <span>
                                    •
                                </span>


                                {/* YEAR */}

                                <span>

                                    {selectedMovie.year}

                                </span>


                                <span>
                                    •
                                </span>


                                {/* DURATION */}

                                <span>

                                    {selectedMovie.duration}

                                </span>


                                <span>
                                    •
                                </span>


                                {/* CERTIFICATE */}

                                <span className="certificate">

                                    {selectedMovie.certificate}

                                </span>


                            </div>


                            {/* =================================
                                GENRES
                            ================================= */}

                            <div className="latest-genres">

                                {

                                    Array.isArray(selectedMovie.genre)

                                        ?

                                        selectedMovie.genre.map(
                                            (genre, index) => (

                                                <React.Fragment
                                                    key={index}
                                                >

                                                    <span>
                                                        {genre}
                                                    </span>


                                                    {

                                                        index <
                                                        selectedMovie.genre.length - 1

                                                        &&

                                                        (

                                                            <span>
                                                                •
                                                            </span>

                                                        )

                                                    }

                                                </React.Fragment>

                                            )
                                        )

                                        :

                                        (

                                            <span>
                                                {selectedMovie.genre}
                                            </span>

                                        )

                                }

                            </div>


                            {/* =================================
                                DESCRIPTION
                            ================================= */}

                            <p className="latest-description">

                                {selectedMovie.description}

                            </p>


                            {/* =================================
                                BUTTONS
                            ================================= */}

                            <div className="latest-buttons">


                                {/* =================================
                                    WATCH NOW
                                ================================= */}

                                <button
                                    className="latest-watch-btn"

                                    onClick={() => {

                                        console.log(
                                            "Selected Movie ID:",
                                            selectedMovie._id
                                        );

                                        navigate(
                                            `/content/newmovie/${selectedMovie._id}`
                                        );

                                    }}


                                >

                                    ▶

                                    <span>
                                        Watch Now
                                    </span>

                                </button>


                                {/* =================================
                                    MORE INFO
                                ================================= */}

                                <button
                                    className="latest-info-btn"

                                    onClick={() => {

                                        console.log(
                                            "Selected Movie ID:",
                                            selectedMovie._id
                                        );

                                        navigate(
                                            `/content/newmovie/${selectedMovie._id}`
                                        );

                                    }}

                                >

                                    More Info

                                    <span className="info-icon">
                                        ⓘ
                                    </span>

                                </button>


                            </div>


                        </div>

                    </div>

                </div>

            )}


            {/* =========================================
                LATEST DROP MOVIE POSTERS
            ========================================= */}

            <div className="latest-drop-list">

                {

                    newMovieData.map((movie) => (

                        <div
                            className="latest-drop-item"

                            key={movie._id}

                            onClick={() => {

                                console.log(
                                    "Selected Movie:",
                                    movie
                                );

                                setSelectedMovie(movie);

                            }}

                        >

                            <img
                                src={movie.image}

                                alt={movie.title}

                                className="latest-drop-poster"
                            />

                        </div>

                    ))

                }

            </div>

        </>
    );

}


export default NewMoviesCarts;