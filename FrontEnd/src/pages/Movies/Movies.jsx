
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Maincarousel from "../../components/MainCarousels/MainCarousel";

import MainMovies from "../../components/Cards/MainMoviesCards/MainMovies";
import NewMoviesCarts from "../../Admin Collection/NewMoviesCarts/NewMoviesCarts";

import "./movies.css";
import Footer from "../../components/Footer/Footer";


function Movies() {

    // ==========================================
    // SELECTED LANGUAGE
    // ==========================================

    const [selectedLanguage, setSelectedLanguage] = useState("All");


    // ==========================================
    // LANGUAGE LIST
    // ==========================================

    const languages = [
        "All",
        "Telugu",
        "Hindi",
        "Tamil",
        "Malayalam",
        "Kannada",
        "English"
    ];


    return (
        <>

            <Navbar />

            <Maincarousel />


            {/* ==================================
                NEW MOVIES
            ================================== */}

            <NewMoviesCarts />


            {/* ==================================
                MOVIES HEADING
            ================================== */}

            <h1 className="headings">
                Movies
            </h1>


            {/* ==================================
                LANGUAGE BUTTONS
            ================================== */}

            <section className="language-filter">

                <div className="language-buttons">

                    {languages.map((language) => (

                        <button
                            key={language}

                            className={
                                selectedLanguage === language
                                    ? "language-btn active"
                                    : "language-btn"
                            }

                            onClick={() =>
                                setSelectedLanguage(language)
                            }
                        >
                            {language}
                        </button>

                    ))}

                </div>

            </section>


            {/* ==================================
                MAIN MOVIES
            ================================== */}

            <MainMovies
                selectedLanguage={selectedLanguage}
            />

            <Footer/>

        </>
    );
}


export default Movies;

