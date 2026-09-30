import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePageAnime({ search = "" }) {

    const [AnimeData, setAnimeData] = useState([]);

    const [page, setPage] = useState(1);

    const [hasMore, setHasMore] = useState(true);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    // ==================================================
    // RESET WHEN SEARCH CHANGES
    // ==================================================

    useEffect(() => {

        setAnimeData([]);

        setPage(1);

        setHasMore(true);

    }, [search]);


    // ==================================================
    // FETCH ANIME
    // ==================================================

    useEffect(() => {

        const fetchAnime = async () => {

            try {

                setLoading(true);


                const cleanSearch =
                    search?.trim() || "";


                const response = await axios.get(

                    `http://localhost:8080/api/HomePageAnime?page=${page}&limit=10&search=${encodeURIComponent(cleanSearch)}`

                );


                console.log(
                    "================================"
                );

                console.log(
                    "ANIME API RESPONSE:",
                    response.data
                );

                console.log(
                    "ANIME DATA:",
                    response.data.data
                );

                console.log(
                    "TOTAL ANIME:",
                    response.data.totalMovies
                );

                console.log(
                    "TOTAL PAGES:",
                    response.data.totalPages
                );

                console.log(
                    "================================"
                );


                const newAnime =
                    Array.isArray(response.data.data)
                        ? response.data.data
                        : [];


                // ==================================================
                // SAVE ANIME
                // ==================================================

                setAnimeData((previousAnime) => {

                    if (page === 1) {

                        return newAnime;

                    }


                    return [
                        ...previousAnime,
                        ...newAnime
                    ];

                });


                // ==================================================
                // SHOW MORE
                // ==================================================

                setHasMore(

                    page <
                    (response.data.totalPages || 0)

                );

            }


            catch (error) {

                console.error(
                    "ANIME API ERROR:",
                    error
                );

                console.error(
                    "ANIME API ERROR RESPONSE:",
                    error.response?.data
                );


                if (page === 1) {

                    setAnimeData([]);

                }

            }


            finally {

                setLoading(false);

            }

        };


        fetchAnime();

    }, [page, search]);


    // ==================================================
    // CARD CLICK
    // ==================================================

    const openAnime = (id) => {

        navigate(
            `/content/anime/${id}`
        );

    };


    // ==================================================
    // JSX
    // ==================================================

    return (

        <section className="stream-library">


            <div className="stream-grid">


                {/* ==========================================
                    ANIME CARDS
                ========================================== */}

                {AnimeData.length > 0 ? (

                    AnimeData.map((item) => (

                        <article
                            className="stream-tile"
                            key={item._id}
                            onClick={() =>
                                openAnime(item._id)
                            }
                        >


                            {/* POSTER */}

                            <div className="stream-poster">

                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                />

                            </div>


                            {/* INFORMATION */}

                            <div className="stream-information">


                                <h3 className="stream-name">

                                    {item.title}

                                </h3>


                                <div className="stream-details">


                                    <span className="stream-score">

                                        ⭐ {item.rating}

                                    </span>


                                    <span className="stream-release">

                                        {item.year}

                                    </span>


                                </div>


                                <span className="stream-category">

                                    {
                                        Array.isArray(item.genre)

                                            ? item.genre.join(" • ")

                                            : item.genre || "Anime"
                                    }

                                </span>


                            </div>


                        </article>

                    ))

                ) : (

                    !loading && (

                        <div className="anime-no-results">

                            <h3>
                                No anime found
                            </h3>

                            <p>
                                Try another anime name,
                                year or genre.
                            </p>

                        </div>

                    )

                )}

            </div>


            {/* ==========================================
                LOADING
            ========================================== */}

            {loading && (

                <div className="anime-loading">

                    Loading...

                </div>

            )}


            {/* ==========================================
                SHOW MORE
            ========================================== */}

            {!loading &&
                hasMore &&
                AnimeData.length > 0 && (

                    <div className="stream-more-area">

                        <button
                            className="stream-more-button"
                            onClick={() =>
                                setPage(
                                    (previousPage) =>
                                        previousPage + 1
                                )
                            }
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


export default HomePageAnime;