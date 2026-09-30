import React from "react";
import WelcomeNavbar from "../../components/WelcomeNavbar/WelcomeNavbar";
import "./servicesPage.css";

function ServicesPage() {
    const services = [
        {
            icon: "🎬",
            title: "Movies",
            description:
                "Explore a wide collection of movies across different genres, languages and years.",
        },
        {
            icon: "📺",
            title: "Web Series",
            description:
                "Discover exciting web series and keep up with popular entertainment.",
        },
        {
            icon: "🔎",
            title: "Easy Discovery",
            description:
                "Find your favorite movies and series easily through categories and organized content.",
        },
        {
            icon: "❤️",
            title: "My List",
            description:
                "Save your favorite movies and web series and keep your personal watchlist.",
        },
    ];

    return (
        <>
            <WelcomeNavbar />

            <main className="services-page">

                {/* HERO */}

                <section className="services-hero">

                    <div className="services-bg"></div>

                    <div className="services-hero-content">

                        <span className="services-label">
                            MOVIESTREAM SERVICES
                        </span>

                        <h1>
                            Entertainment.
                            <span> Your Way.</span>
                        </h1>

                        <p>
                            Everything you love to watch,
                            brought together in one streaming experience.
                        </p>

                    </div>

                </section>


                {/* SERVICES */}

                <section className="services-section">

                    <div className="services-heading">

                        <span className="services-label">
                            WHAT WE OFFER
                        </span>

                        <h2>
                            Everything You Need
                            <span> To Enjoy.</span>
                        </h2>

                        <p>
                            Explore the features that make MOVIESTREAM
                            your entertainment destination.
                        </p>

                    </div>


                    <div className="services-grid">

                        {services.map((service, index) => (

                            <div
                                className="service-card"
                                key={index}
                            >

                                <div className="service-icon">
                                    {service.icon}
                                </div>

                                <span className="service-number">
                                    0{index + 1}
                                </span>

                                <h3>
                                    {service.title}
                                </h3>

                                <p>
                                    {service.description}
                                </p>

                                <div className="service-arrow">
                                    →
                                </div>

                            </div>

                        ))}

                    </div>

                </section>


                {/* BOTTOM CTA */}

                <section className="services-cta">

                    <span className="services-label">
                        START EXPLORING
                    </span>

                    <h2>
                        Your Next Favorite
                        <span> Story Awaits.</span>
                    </h2>

                    <p>
                        Discover something new and start watching.
                    </p>

                    <button className="services-btn">
                        Explore Now →
                    </button>

                </section>

            </main>
        </>
    );
}

export default ServicesPage;