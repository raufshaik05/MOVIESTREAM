import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePageWebseries({ language = "All" }) {

    const [HomeWebSeries, setHomeWebSeries] = useState([]);

    const [page, setPage] = useState(1);

    const [hasMore, setHasMore] = useState(true);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    // =====================================================
    // RESET WHEN LANGUAGE CHANGES
    // =====================================================

    useEffect(() => {

        setHomeWebSeries([]);

        setPage(1);

        setHasMore(true);

    }, [language]);


    // =====================================================
    // GET WEB SERIES
    // =====================================================

    useEffect(() => {

        getWebSeries();

    }, [page, language]);


    // =====================================================
    // FETCH WEB SERIES
    // =====================================================

    async function getWebSeries() {

        try {

            setLoading(true);


         let url = `${import.meta.env.VITE_API_URL}/api/HomeWebSeriesCard?page=${page}&limit=10`;


            // =================================================
            // LANGUAGE FILTER
            // =================================================

            if (
                language &&
                language !== "All"
            ) {

                url +=
                    `&language=${encodeURIComponent(language)}`;

            }


            console.log(
                "================================"
            );

            console.log(
                "WEB SERIES API"
            );

            console.log(
                url
            );

            console.log(
                "================================"
            );


            // =================================================
            // API REQUEST
            // =================================================

            const response =
                await axios.get(url);


            console.log(
                "WEB SERIES RESPONSE:",
                response.data
            );


            // =================================================
            // GET DATA
            // =================================================

            const newData =
                response.data?.data || [];


            // =================================================
            // SET DATA
            // =================================================

            setHomeWebSeries((previousData) => {

                // FIRST PAGE
                if (page === 1) {

                    return newData;

                }


                // SHOW MORE
                return [
                    ...previousData,
                    ...newData
                ];

            });


            // =================================================
            // CHECK HAS MORE
            // =================================================

            if (
                newData.length < 10
            ) {

                setHasMore(false);

            } else {

                setHasMore(true);

            }


        } catch (error) {

            console.log(
                "================================"
            );

            console.log(
                "WEB SERIES ERROR"
            );

            console.log(
                error.response?.data ||
                error.message
            );

            console.log(
                "================================"
            );


            // If first page fails
            if (page === 1) {

                setHomeWebSeries([]);

            }

        } finally {

            setLoading(false);

        }

    }


    // =====================================================
    // OPEN SINGLE WEB SERIES
    // =====================================================

    function openWebSeries(id) {

        if (!id) {

            console.log(
                "Web series ID not found"
            );

            return;

        }


        console.log(
            "Opening web series:",
            id
        );


        navigate(
            `/content/webseries/${id}`
        );

    }


    // =====================================================
    // SHOW MORE
    // =====================================================

    function showMore() {

        if (loading) {

            return;

        }


        if (!hasMore) {

            return;

        }


        setPage(
            (previousPage) =>
                previousPage + 1
        );

    }


    // =====================================================
    // RETURN
    // =====================================================

    return (

        <section className="stream-library">


            {/* =================================================
                WEB SERIES GRID
            ================================================= */}

            <div className="stream-grid">


                {HomeWebSeries.map(
                    (item) => (

                        <article
                            className="stream-tile"
                            key={item._id}

                            onClick={() =>
                                openWebSeries(
                                    item._id
                                )
                            }
                        >


                            {/* =================================
                                POSTER
                            ================================= */}

                            <div className="stream-poster">

                                <img
                                    src={item.image}
                                    alt={
                                        item.title ||
                                        "Web Series"
                                    }
                                />

                            </div>


                            {/* =================================
                                INFORMATION
                            ================================= */}

                            <div className="stream-information">


                                {/* TITLE */}

                                <h3 className="stream-name">

                                    {item.title}

                                </h3>


                                {/* RATING + YEAR */}

                                <div className="stream-details">

                                    <span className="stream-score">

                                        ⭐{" "}

                                        {
                                            item.rating ??
                                            "N/A"
                                        }

                                    </span>


                                    <span className="stream-release">

                                        {
                                            item.year ??
                                            "N/A"
                                        }

                                    </span>

                                </div>


                                {/* GENRE */}

                                <span className="stream-category">

                                    {

                                        Array.isArray(
                                            item.genre
                                        )

                                            ?

                                            item.genre.join(
                                                " • "
                                            )

                                            :

                                            item.genre ||
                                            "Drama"

                                    }

                                </span>

                            </div>

                        </article>

                    )
                )}

            </div>


            {/* =================================================
                LOADING
            ================================================= */}

            {loading &&
                page === 1 && (

                    <div className="no-webseries">

                        Loading web series...

                    </div>

                )
            }


            {/* =================================================
                NO DATA
            ================================================= */}

            {!loading &&
                HomeWebSeries.length === 0 && (

                    <p className="no-webseries">

                        No web series found.

                    </p>

                )
            }


            {/* =================================================
                SHOW MORE
            ================================================= */}

            {hasMore &&
                HomeWebSeries.length > 0 && (

                    <div className="stream-more-area">

                        <button
                            className="stream-more-button"
                            onClick={showMore}
                            disabled={loading}
                        >

                            <span>

                                {
                                    loading
                                        ? "Loading..."
                                        : "Show More"
                                }

                            </span>


                            <span className="stream-more-icon">

                                +

                            </span>

                        </button>

                    </div>

                )
            }

        </section>

    );

}


export default HomePageWebseries;