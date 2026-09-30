
import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaTwitter,
    FaGithub,
    FaPlay
} from "react-icons/fa";

import "./Footer.css";

function Footer() {
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer className="ott-footer">

            {/* =====================================
                FOOTER TOP
            ===================================== */}
            <div className="footer-container">

                {/* BRAND */}
                <div className="footer-brand">

                    <div
                        className="footer-logo"
                        onClick={scrollTop}
                    >
                        <span className="footer-logo-icon">
                            <FaPlay />
                        </span>

                        <span>MOVIESTREAM</span>
                    </div>

                    <p>
                        Your Entertainment. Your World.
                    </p>

                    <p className="footer-description">
                        Discover movies, web series, anime and shows
                        all in one place.
                    </p>

                    {/* SOCIAL MEDIA */}
                    <div className="footer-social">

                        <a href="#" aria-label="Facebook">
                            <FaFacebookF />
                        </a>

                        <a href="#" aria-label="Instagram">
                            <FaInstagram />
                        </a>

                        <a href="#" aria-label="YouTube">
                            <FaYoutube />
                        </a>

                        <a href="#" aria-label="Twitter">
                            <FaTwitter />
                        </a>

                        <a href="#" aria-label="GitHub">
                            <FaGithub />
                        </a>

                    </div>

                </div>


                {/* QUICK LINKS */}
                <div className="footer-column">

                    <h3>Explore</h3>

                    <a href="/Home">Home</a>
                    <a href="/movies">Movies</a>
                    <a href="/webseries">Web Series</a>
                    <a href="/anime">Anime</a>
                    <a href="/shows">Shows</a>

                </div>


                {/* INFORMATION */}
                <div className="footer-column">

                    <h3>Information</h3>

                    <a href="/about">About Us</a>
                    <a href="/services">Services</a>
                    <a href="/profile">My Profile</a>
                    <a href="/contact">Contact Us</a>

                </div>


                {/* SUPPORT */}
                <div className="footer-column">

                    <h3>Support</h3>

                    <a href="#">Help Center</a>
                    <a href="#">FAQ</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms & Conditions</a>
                    <a href="#">Cookie Policy</a>

                </div>

            </div>


            {/* =====================================
                FOOTER DIVIDER
            ===================================== */}
            <div className="footer-divider"></div>


            {/* =====================================
                FOOTER BOTTOM
            ===================================== */}
            <div className="footer-bottom">

                <p>
                    © {new Date().getFullYear()} MOVIESTREAM.
                    All rights reserved.
                </p>

                <div className="footer-bottom-links">

                    <a href="#">
                        Privacy
                    </a>

                    <a href="#">
                        Terms
                    </a>

                    <a href="#">
                        Cookies
                    </a>

                </div>

            </div>

        </footer>
    );
}

export default Footer;