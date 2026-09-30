import axios from "axios";
import React, { useState, useEffect } from "react";
import "./animeCarousel.css";


function AnimeCarousel() {

    const [AnimeData, setAnimeData] = useState([]);

    const [webCarouselIndex, setWebCarouselIndex] = useState(0);


    // =====================================================
    // GET ANIME CAROUSEL DATA
    // =====================================================

    useEffect(() => {

        AnimeApiData();

    }, []);


    async function AnimeApiData() {

        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/AnimeMainCarousel`
            );

            setAnimeData(response.data.data);

        } catch (error) {

            console.log(error.message);

        }

    }


    // =====================================================
    // AUTO SLIDE
    // =====================================================

    useEffect(() => {

        if (AnimeData.length === 0) {
            return;
        }

        const timer = setInterval(() => {

            setWebCarouselIndex((prev) =>
                prev === AnimeData.length - 1
                    ? 0
                    : prev + 1
            );

        }, 4000);


        return () => clearInterval(timer);

    }, [AnimeData]);


    // =====================================================
    // LOADING
    // =====================================================

    if (AnimeData.length === 0) {

        return (
            <div className="webCarousel-loading">
                Loading....
            </div>
        );

    }


    // =====================================================
    // CURRENT ANIME
    // =====================================================

    const currentAnime = AnimeData[webCarouselIndex];


    // =====================================================
    // JSX
    // =====================================================

    return (

        <section className="webCarousel">

            <div className="webCarousel-slide">


                {/* BACKGROUND IMAGE */}

                <img
                    src={currentAnime.image}
                    alt={currentAnime.title}
                    className="webCarousel-image"
                />


                {/* DARK OVERLAY */}

                <div className="webCarousel-overlay"></div>


                {/* CONTENT */}

                <div className="webCarousel-content">


                    {/* TRENDING */}

                    <span className="webCarousel-badge">
                        🔥 Trending
                    </span>


                    {/* TITLE */}

                    <h1 className="webCarousel-title">
                        {currentAnime.title}
                    </h1>


                    {/* DESCRIPTION */}

                    <p className="webCarousel-description">
                        {currentAnime.description}
                    </p>


                    {/* META INFORMATION */}

                    <div className="webCarousel-meta">


                        {/* RATING */}

                        <span className="webCarousel-rating">
                            ⭐ {currentAnime.rating}
                        </span>


                        {/* YEAR */}

                        <span className="webCarousel-year">
                            {currentAnime.year}
                        </span>


                        {/* GENRE */}

                        <span className="webCarousel-genre">
                            {currentAnime.genre}
                        </span>


                        {/* LANGUAGE */}

                        <span className="webCarousel-language">
                            {currentAnime.language}
                        </span>


                    </div>


                    {/* BUTTONS */}

                    <div className="webCarousel-buttons">

                        <button className="webCarousel-watch">
                            ▶ Watch Now
                        </button>


                        <button className="webCarousel-info">
                            More Info
                        </button>

                    </div>


                </div>

            </div>

        </section>

    );

}


export default AnimeCarousel;