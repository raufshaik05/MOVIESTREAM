import React, { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import "./webseries.css";

import WebCarousel from "../../components/web series Carousel/WebCarousel";
import WebSeriesShortCards from "../../components/Cards/WebseriesShortCards/WebSeriesShortCards";
import HomePageWebseries from "../../components/Cards/Home page web series/HomePageWebseries";
import Footer from "../../components/Footer/Footer";


function WebSeries() {

    const [language, setLanguage] = useState("All");


    const languages = [
        "All",
        "Telugu",
        "Hindi",
        "Tamil",
        "Kannada",
        "Malayalam",
        "English"
    ];


    return (

        <>

            <Navbar />

            <WebCarousel />

            <WebSeriesShortCards />


            {/* ==========================================
                LANGUAGE FILTER
            ========================================== */}

            <section className="language-filter">

                {/* <h2>Browse by Language</h2> */}


                <div className="language-buttons">

                    {languages.map((lang) => (

                        <button
                            key={lang}

                            className={
                                language === lang
                                    ? "language-btn active"
                                    : "language-btn"
                            }

                            onClick={() => setLanguage(lang)}
                        >

                            {lang}

                        </button>

                    ))}

                </div>

            </section>


            {/* ==========================================
                WEB SERIES
            ========================================== */}

            <HomePageWebseries
                language={language}
            />

            <Footer />
        </>

    );

}

export default WebSeries;