import React, { useEffect, useState } from "react";
import axios from "axios";

import "./mainCarousel.css";

function Maincarousel() {

    const [carousel, setCarousel] = useState([]);
    const [current, setCurrent] = useState(0);


    // =========================================
    // GET CAROUSEL DATA
    // =========================================

    useEffect(() => {

        const getCarousel = async () => {

            try {

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/carousel`
                );

                console.log("Carousel Data:", response.data);

                setCarousel(response.data.data);

            } catch (error) {

                console.log("Carousel Error:", error);

            }

        };

        getCarousel();

    }, []);


    // =========================================
    // AUTO SLIDE
    // =========================================

    useEffect(() => {

        if (carousel.length === 0) {
            return;
        }

        const timer = setInterval(() => {

            setCurrent((prev) => {

                if (prev === carousel.length - 1) {
                    return 0;
                }

                return prev + 1;

            });

        }, 4000);


        return () => clearInterval(timer);

    }, [carousel]);


    // =========================================
    // LOADING
    // =========================================

    if (carousel.length === 0) {

        return (
            <div className="movieCarousel-loading">
                Loading...
            </div>
        );

    }


    // =========================================
    // CURRENT MOVIE
    // =========================================

    const movie = carousel[current];


    return (

        <section className="movieCarousel">

            <div className="movieCarousel-slide">


                {/* =================================
                    BACKGROUND IMAGE
                ================================= */}

                <img
                    src={movie.image}
                    alt={movie.title}
                    className="movieCarousel-image"
                />


                {/* =================================
                    DARK OVERLAY
                ================================= */}

                <div className="movieCarousel-overlay"></div>


                {/* =================================
                    MOVIE CONTENT
                ================================= */}

                <div className="movieCarousel-content">


                    {/* TRENDING */}

                    <span className="movieCarousel-badge">
                        🔥 Trending
                    </span>


                    {/* TITLE */}

                    <h1 className="movieCarousel-title">
                        {movie.title}
                    </h1>


                    {/* DESCRIPTION */}

                    <p className="movieCarousel-description">
                        {movie.description}
                    </p>


                    {/* MOVIE INFORMATION */}

                    <div className="movieCarousel-meta">

                        <span className="movieCarousel-rating">
                            ⭐ {movie.rating}
                        </span>

                        <span className="movieCarousel-year">
                            {movie.year}
                        </span>

                        <span className="movieCarousel-duration">
                            {movie.duration}
                        </span>

                        <span className="movieCarousel-certificate">
                            {movie.certificate}
                        </span>

                        <span className="movieCarousel-language">
                            {movie.language}
                        </span>

                    </div>


                    {/* BUTTONS */}

                    <div className="movieCarousel-buttons">

                        <button className="movieCarousel-watch">
                            ▶ Watch Now
                        </button>

                        <button className="movieCarousel-info">
                            More Info
                        </button>

                    </div>


                </div>


            </div>

        </section>

    );

}

export default Maincarousel;