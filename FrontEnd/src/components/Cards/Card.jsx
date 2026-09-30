import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

function Card() {

    const [trendingData, setTrendingData] = useState([]);

    const navigate = useNavigate();


    // =====================================================
    // GET WEB SERIES + ANIME
    // =====================================================

    useEffect(() => {
        getTrendingData();
    }, []);


    async function getTrendingData() {

        try {

            const [webSeriesResponse, animeResponse] =
                await Promise.all([

                    axios.get(
                        "http://localhost:8080/api/newMoviePostData?type=web-series"
                    ),

                    axios.get(
                        "http://localhost:8080/api/newMoviePostData?type=anime"
                    )

                ]);


            // =====================================================
            // WEB SERIES
            // =====================================================

            const webSeries =
                Array.isArray(webSeriesResponse.data?.data)
                    ? webSeriesResponse.data.data.map((item) => ({
                        ...item,
                        frontendType: "webseries"
                    }))
                    : [];


            // =====================================================
            // ANIME
            // =====================================================

            const anime =
                Array.isArray(animeResponse.data?.data)
                    ? animeResponse.data.data.map((item) => ({
                        ...item,
                        frontendType: "anime"
                    }))
                    : [];


            // =====================================================
            // COMBINE WEB SERIES + ANIME
            // =====================================================

            const combinedData = [];


            const maxLength = Math.max(
                webSeries.length,
                anime.length
            );


            // Alternate Web Series + Anime
            for (let i = 0; i < maxLength; i++) {

                if (webSeries[i]) {
                    combinedData.push(webSeries[i]);
                }

                if (anime[i]) {
                    combinedData.push(anime[i]);
                }

            }


            // =====================================================
            // SHOW TRENDING ITEMS
            // =====================================================

            setTrendingData(combinedData);


            console.log(
                "TRENDING WEB SERIES:",
                webSeries
            );

            console.log(
                "TRENDING ANIME:",
                anime
            );

            console.log(
                "COMBINED TRENDING:",
                combinedData
            );

        } catch (error) {

            console.log(
                "TRENDING ERROR:",
                error.response?.data || error.message
            );

        }

    }


    // =====================================================
    // SEE ALL
    // =====================================================

    const handleSeeAll = () => {
        navigate("/webseries");
    };


    // =====================================================
    // CARD CLICK
    // =====================================================

    const handleCardClick = (item) => {

        if (!item?._id) {
            console.log("CONTENT ID IS MISSING");
            return;
        }


        if (item.frontendType === "anime") {

            navigate(`/content/anime/${item._id}`);

        } else {

            navigate(`/content/webseries/${item._id}`);

        }

    };


    return (

        <section className="trending-section">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="section-header">

                <h2 className="trending-title">

                    <span className="trending-icon">
                        🔥
                    </span>

                    <span className="trending-text">
                        Trending
                    </span>

                </h2>


                <button
                    type="button"
                    className="see-all"
                    onClick={handleSeeAll}
                >
                    See All →
                </button>

            </div>


            {/* =====================================================
                TRENDING CARDS
            ===================================================== */}

            <div className="series-row">

                {trendingData.length > 0 ? (

                    trendingData.map((item) => (

                        <div
                            className="series-card"
                            key={`${item.frontendType}-${item._id}`}
                            onClick={() => handleCardClick(item)}
                        >

                            {/* POSTER */}

                            <img
                                src={item.image}
                                alt={
                                    item.title ||
                                    "Trending Content"
                                }
                                loading="lazy"
                            />


                            {/* INFORMATION */}

                            <div className="series-info">

                                <h3>
                                    {item.title ||
                                        "Untitled"}
                                </h3>


                                <p>

                                    ⭐ {item.rating ?? "N/A"}

                                    <span className="card-separator">
                                        •
                                    </span>

                                    {item.year || "N/A"}

                                </p>


                                <span>

                                    {Array.isArray(item.genre)
                                        ? item.genre.join(", ")
                                        : item.genre || "N/A"}

                                </span>

                            </div>


                            {/* PLAY BUTTON */}

                            <button
                                type="button"
                                className="play-btn"
                                aria-label={`Open ${item.title || "content"}`}
                                onClick={(e) => {

                                    e.stopPropagation();

                                    handleCardClick(item);

                                }}
                            >
                                ▶
                            </button>

                        </div>

                    ))

                ) : (

                    <p className="no-series">
                        No trending content available.
                    </p>

                )}

            </div>

        </section>

    );

}

export default Card;