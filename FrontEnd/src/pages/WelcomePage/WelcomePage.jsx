
import React from 'react'
import WelcomeNavbar from '../../components/WelcomeNavbar/WelcomeNavbar'
import { Link } from 'react-router-dom'
import "./welcomePage.css"

function WelcomePage() {
    return (
        <>

            <div className="welcome-page">

                <WelcomeNavbar />

                {/* ================= HERO ================= */}

                <section className="hero-section">

                    <div className="welcome-content">

                        <p className="welcome-small">
                            WELCOME TO
                        </p>

                            <h2>Movie<span>Stream</span></h2>

                        <h3>
                            Your Entertainment. Your World.
                        </h3>

                        <p className="welcome-description">
                            Discover movies, web series, anime and
                            exclusive entertainment all in one place.
                        </p>

                        <div className="welcome-buttons">

                            <button className="get-started">
                                <span className="play-icon">▶</span>
                                GET STARTED
                            </button>

                            <button className="explore-btn">
                                EXPLORE NOW
                            </button>

                        </div>

                    </div>


                    {/* HERO POSTERS */}

                    <div className="hero-posters">

                        <div className="poster poster-one">
                            <div className="poster-overlay">
                                <img src="https://i.pinimg.com/1200x/2c/73/3d/2c733dd690cbad6a7ac7f0e2fe6f3861.jpg" alt="" />
                            </div>
                        </div>

                        <div className="poster poster-main">
                            <div className="poster-overlay">
                                <img src="https://i.pinimg.com/736x/2d/c1/a8/2dc1a82c7fd31e5b715be442b84d9bb3.jpg" alt="" />
                            </div>
                        </div>

                        <div className="poster poster-three">
                            <div className="poster-overlay">
                                <img src="https://www.sakshi.com/gallery_images/2024/01/20/actor%20krishnam%20raju%20rare%20photos-25.jpg" alt="" />
                            </div>
                        </div>

                    </div>

                </section>


                {/* ================= CATEGORIES ================= */}

                <section className="categories-section">

                    <p className="section-small">
                        EXPLORE YOUR WORLD
                    </p>

                    <h2>
                        Everything You Love To Watch
                    </h2>

                    <p className="section-description">
                        Discover entertainment across movies, series,
                        anime and trending content.
                    </p>


                    <div className="category-container">

                        <div className="category-card">
                            <span>🎬</span>
                            <h3>Movies</h3>
                            <p>Discover amazing movies.</p>
                        </div>

                        <div className="category-card">
                            <span>📺</span>
                            <h3>Web Series</h3>
                            <p>Binge your favorite series.</p>
                        </div>

                        <div className="category-card">
                            <span>🍿</span>
                            <h3>Anime</h3>
                            <p>Explore incredible anime.</p>
                        </div>

                        <div className="category-card">
                            <span>🔥</span>
                            <h3>Trending</h3>
                            <p>See what's popular now.</p>
                        </div>

                    </div>

                </section>


                {/* ================= FEATURES ================= */}

                <section className="features-section">

                    <div className="feature-content">

                        <p className="section-small">
                            WHY MOVIESTREAM
                        </p>

                        <h2>
                            Your Entertainment,
                            <span> Your Way.</span>
                        </h2>

                        <p>
                            MOVIESTREAM makes discovering and enjoying
                            your favorite entertainment simple and enjoyable.
                        </p>

                    </div>


                    <div className="features-container">

                        <div className="feature-card">

                            <div className="feature-icon">
                                🎥
                            </div>

                            <h3>
                                Huge Library
                            </h3>

                            <p>
                                Explore movies, web series and anime
                                from different genres.
                            </p>

                        </div>


                        <div className="feature-card">

                            <div className="feature-icon">
                                🔎
                            </div>

                            <h3>
                                Easy Discovery
                            </h3>

                            <p>
                                Quickly find something interesting
                                to watch.
                            </p>

                        </div>


                        <div className="feature-card">

                            <div className="feature-icon">
                                ❤️
                            </div>

                            <h3>
                                My List
                            </h3>

                            <p>
                                Save your favorite movies and
                                watch them later.
                            </p>

                        </div>

                    </div>

                </section>


                {/* ================= CTA =================

                <section className="final-cta">

                    <div className="cta-content">

                        <p className="section-small">
                            YOUR NEXT STORY STARTS HERE
                        </p>

                        <h2>
                            Ready To Start Watching?
                        </h2>

                        <p>
                            Join MOVIESTREAM and discover your
                            next favorite movie or series.
                        </p>

                        <button className="cta-button">
                            GET STARTED
                        </button>

                    </div>

                </section> */}


                {/* ================= FOOTER ================= */}

                <footer className="welcome-footer">

                    <h2>
                        Movie<span>Stream</span>
                    </h2>

                    <p>
                        Your Entertainment. Your World.
                    </p>

                    <div className="footer-links">
                        <a href="#">Home</a>
                        <a href="#">About</a>
                        <a href="#">Services</a>
                        <a href="#">Contact</a>
                    </div>

                    <p className="copyright">
                        © 2026 MOVIESTREAM. All rights reserved.
                    </p>

                </footer>

            </div>




        </>
    )
}

export default WelcomePage