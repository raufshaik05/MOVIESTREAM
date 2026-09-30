import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import AnimeCarousel from "../../components/Anime Carousel/AnimeCarousel";
import Card from "../../components/Cards/Card";
import HomePageAnime from "../../components/Cards/HomePageAnime/HomePageAnime";

import "./Anime.css";
import Footer from "../../components/Footer/Footer";

function Anime() {

    const [search, setSearch] = useState("");

    return (
        <>
            <Navbar />

            <AnimeCarousel />

            <Card />

            {/* SEARCH */}

            <section className="anime-search-section">

                <div className="anime-search-box">

                    <input
                        type="text"
                        placeholder="Search anime, year or genre..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <span className="anime-search-icon">
                        🔍
                    </span>

                </div>

            </section>


            {/* ANIME */}

            <HomePageAnime
                search={search}
            />

            <Footer />

        </>
    );
}

export default Anime;