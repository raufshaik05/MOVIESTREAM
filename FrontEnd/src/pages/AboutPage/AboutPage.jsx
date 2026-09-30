import React from "react";
import WelcomeNavbar from "../../components/WelcomeNavbar/WelcomeNavbar";
import "./aboutPage.css";

function AboutPage() {
    return (
        <>
            <WelcomeNavbar />

            <main className="about-page">

                {/* ================= HERO ================= */}

                <section className="about-hero">

                    <div className="hero-bg"></div>

                    <div className="hero-content">

                        <span className="small-title">
                            ABOUT MOVIESTREAM
                        </span>

                        <h1>
                            Entertainment.
                            <span>Reimagined.</span>
                        </h1>

                        <p>
                            Discover movies, web series & anime
                            in one beautiful streaming experience.
                        </p>

                        <a href="#platform" className="explore-btn">
                            Explore Now
                            <span>→</span>
                        </a>

                    </div>

                </section>


                {/* ================= WHAT IS MOVIESTREAM ================= */}

                <section className="about-info" id="platform">

                    <div className="info-content">

                        <span className="small-title">
                            OUR PLATFORM
                        </span>

                        <h2>
                            What is
                            <span>MOVIESTREAM?</span>
                        </h2>

                        <p>
                            MOVIESTREAM is a modern OTT platform built
                            for discovering and enjoying movies, web
                            series and anime.
                        </p>

                        <div className="feature-container">

                            <div className="feature-card">

                                <div className="feature-icon">
                                    🎬
                                </div>

                                <div>
                                    <h3>Movies</h3>

                                    <p>
                                        Discover your favorite movies.
                                    </p>
                                </div>

                            </div>


                            <div className="feature-card">

                                <div className="feature-icon">
                                    📺
                                </div>

                                <div>
                                    <h3>Web Series</h3>

                                    <p>
                                        Explore exciting series.
                                    </p>
                                </div>

                            </div>


                            <div className="feature-card">

                                <div className="feature-icon">
                                    ❤️
                                </div>

                                <div>
                                    <h3>My List</h3>

                                    <p>
                                        Save what you love.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="info-image">

                        <div className="image-glow"></div>

                        <img
                            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=85"
                            alt="Movie Theater"
                        />

                    </div>

                </section>


                {/* ================= DEVELOPER ================= */}

                <section className="developer">

                    <div className="developer-card">

                        <div className="developer-avatar">
                            SR
                        </div>

                        <div className="developer-info">

                            <span className="small-title">
                                BUILT BY
                            </span>

                            <h2>
                                SHAIK RAUF
                            </h2>

                            <p>
                                Full Stack Developer
                            </p>

                            <div className="tech-stack">

                                <span>React</span>
                                <span>Node.js</span>
                                <span>Express.js</span>
                                <span>MongoDB</span>

                            </div>

                        </div>

                    </div>

                </section>

            </main>
        </>
    );
}

export default AboutPage;