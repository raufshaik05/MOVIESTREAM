import axios from "axios";
import React, { useState, useEffect } from "react";
import "./webCarousel.css";

function WebCarousel() {

    const [webData, setWebData] = useState([]);
    const [webCarouselIndex, setWebCarouselIndex] = useState(0);


    // =====================================================
    // GET WEB SERIES CAROUSEL DATA
    // =====================================================

    useEffect(() => {
        WebApiData();
    }, []);


    async function WebApiData() {

        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/MainWebSeriesCarousel`
            );

            setWebData(response.data.data);

        } catch (error) {

            console.log(error.message);

        }
    }


    // =====================================================
    // AUTO SLIDE
    // =====================================================

    useEffect(() => {

        if (webData.length === 0) {
            return;
        }

        const timer = setInterval(() => {

            setWebCarouselIndex((prev) =>
                prev === webData.length - 1
                    ? 0
                    : prev + 1
            );

        }, 4000);

        return () => clearInterval(timer);

    }, [webData]);


    // =====================================================
    // LOADING
    // =====================================================

    if (webData.length === 0) {

        return (
            <div className="webCarousel-loading">
                Loading....
            </div>
        );

    }


    // =====================================================
    // CURRENT WEB SERIES
    // =====================================================

    const currentWeb = webData[webCarouselIndex];


    // =====================================================
    // JSX
    // =====================================================

    return (

        <section className="webCarousel">

            <div className="webCarousel-slide">

                {/* BACKGROUND IMAGE */}

                <img
                    src={currentWeb.image}
                    alt={currentWeb.title}
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
                        {currentWeb.title}
                    </h1>


                    {/* DESCRIPTION */}

                    <p className="webCarousel-description">
                        {currentWeb.description}
                    </p>


                    {/* META INFORMATION */}

                    <div className="webCarousel-meta">


                        {/* RATING */}

                        <span className="webCarousel-rating">
                            ⭐ {currentWeb.rating}
                        </span>


                        {/* YEAR */}

                        <span className="webCarousel-year">
                            {currentWeb.year}
                        </span>


                        {/* DURATION */}

                        <span className="webCarousel-duration">
                            {currentWeb.duration}
                        </span>


                        {/* GENRE */}

                        <span className="webCarousel-genre">
                            {currentWeb.genre}
                        </span>


                        {/* LANGUAGE */}

                        <span className="webCarousel-language">
                            {currentWeb.language}
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

export default WebCarousel;