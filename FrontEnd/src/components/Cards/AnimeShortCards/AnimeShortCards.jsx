



import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AnimeShortCards() {

    const [AnimeShortCardsData, setAnimeShortCardsData] = useState([]);

    const navigate = useNavigate();


    // =========================================
    // GET ANIME DATA
    // =========================================

    useEffect(() => {

        AnimeShortCardsApi();

    }, []);


    async function AnimeShortCardsApi() {

        try {

            const AnimeCardsData = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/newMoviePostData?type=anime`
            );

            console.log(
                "Anime Data:",
                AnimeCardsData.data.data
            );


            setAnimeShortCardsData(
                AnimeCardsData.data.data
            );


        } catch (error) {

            console.log(
                "Anime API Error:",
                error.response?.data || error.message
            );

        }

    }


    return (

        <section className="trending-section">

            <div className="section-header">

                <h2>🔥 Trending Anime</h2>

                <button className="see-all">
                    See All →
                </button>

            </div>


            <div className="series-row">

                {
                    AnimeShortCardsData.map((anime) => (

                        <div
                            className="series-card"
                            key={anime._id}

                            onClick={() =>
                                navigate(
                                    `/content/anime/${anime._id}`
                                )
                            }
                        >

                            <img
                                src={anime.image}
                                alt={anime.title}
                            />


                            <div className="series-info">

                                <h3>
                                    {anime.title}
                                </h3>


                                <p>

                                    ⭐ {anime.rating}

                                    &nbsp; • &nbsp;

                                    {anime.year}

                                </p>


                                <span>

                                    {
                                        Array.isArray(anime.genre)
                                            ? anime.genre.join(", ")
                                            : anime.genre
                                    }

                                </span>

                            </div>


                            <button
                                className="play-btn"

                                onClick={(e) => {

                                    e.stopPropagation();

                                    navigate(
                                        `/content/anime/${anime._id}`
                                    );

                                }}
                            >
                                ▶
                            </button>


                        </div>

                    ))
                }

            </div>

        </section>

    );

}

export default AnimeShortCards;