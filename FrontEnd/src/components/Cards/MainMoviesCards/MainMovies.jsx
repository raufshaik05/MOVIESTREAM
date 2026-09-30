import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mainMovies.css";

function MainMovies({ selectedLanguage  = "All" }) {

    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalMovies, setTotalMovies] = useState(0);

    const navigate = useNavigate();


    // ==========================================
    // LANGUAGE CHANGE
    // RESET MOVIES + PAGE
    // ==========================================

    useEffect(() => {

        setMovies([]);
        setCurrentPage(1);

    }, [selectedLanguage]);


    // ==========================================
    // GET MOVIES
    // ==========================================

    useEffect(() => {

        fetchMovies();

    }, [currentPage, selectedLanguage]);


    // ==========================================
    // FETCH MOVIES API
    // ==========================================

    async function fetchMovies() {

        try {

            let url =
                `http://localhost:8080/api/MainMovieCard?page=${currentPage}&limit=10`;


            // ==================================
            // LANGUAGE FILTER
            // ==================================

            if (selectedLanguage && selectedLanguage !== "All") {
                url += `&language=${selectedLanguage}`;
            }

            console.log("MOVIE API:", url);


            const response = await axios.get(url);


            console.log(
                "MOVIES:",
                response.data.data
            );


            // Total movies
            setTotalMovies(
                response.data.totalMovies
            );


            // ==================================
            // ADD MOVIES
            // ==================================

            setMovies((previousMovies) => [

                ...previousMovies,

                ...response.data.data

            ]);


        } catch (error) {

            console.log(
                "Movie API Error:",
                error.response?.data || error.message
            );

        }

    }


    // ==========================================
    // SHOW MORE
    // ==========================================

    function handleShowMore() {

        setCurrentPage(
            currentPage + 1
        );

    }


    // ==========================================
    // CHECK SHOW MORE
    // ==========================================

    const showMore =
        movies.length < totalMovies;


    return (

        <section className="stream-library">


            {/* ==================================
                MOVIE CARDS
            ================================== */}

            <div className="stream-grid">

                {movies.map((movie) => (

                    <article
                        className="stream-tile"
                        key={movie._id}
                        onClick={() =>
                            navigate(
                                `/content/movie/${movie._id}`
                            )
                        }
                    >


                        {/* ==========================
                            POSTER
                        ========================== */}

                        <div className="stream-poster">

                            <img
                                src={movie.image}
                                alt={movie.title}
                            />

                        </div>


                        {/* ==========================
                            MOVIE INFORMATION
                        ========================== */}

                        <div className="stream-information">

                            <h3 className="stream-name">
                                {movie.title}
                            </h3>


                            <div className="stream-details">

                                <span className="stream-score">
                                    ⭐ {movie.rating}
                                </span>

                                <span className="stream-release">
                                    {movie.year}
                                </span>

                            </div>


                            <span className="stream-category">

                                {Array.isArray(movie.genre)
                                    ? movie.genre.join(" • ")
                                    : movie.genre}

                            </span>

                        </div>


                    </article>

                ))}

            </div>


            {/* ==================================
                SHOW MORE
            ================================== */}

            {showMore && (

                <div className="stream-more-area">

                    <button
                        className="stream-more-button"
                        onClick={handleShowMore}
                    >

                        <span>
                            Show More
                        </span>

                        <span className="stream-more-icon">
                            +
                        </span>

                    </button>

                </div>

            )}

        </section>

    );

}


export default MainMovies;