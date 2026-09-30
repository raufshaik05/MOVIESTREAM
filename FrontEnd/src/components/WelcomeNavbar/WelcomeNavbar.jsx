import React, { useState } from "react";
import "./welcomeNavbar.css";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function WelcomeNavbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    const location = useLocation();

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <header className="NavbarContainer">

            {/* =====================================================
                LOGO
            ===================================================== */}

            <div className="logo">
                <Link to="/" onClick={closeMenu}>
                    Movie<span>Stream</span>
                </Link>
            </div>


            {/* =====================================================
                NAVIGATION
            ===================================================== */}

            <nav
                className={`welcome-nav-links ${
                    menuOpen ? "mobile-menu-open" : ""
                }`}
            >

                <Link
                    to="/"
                    className={isActive("/") ? "active" : ""}
                    onClick={closeMenu}
                >
                    Home
                </Link>

                <Link
                    to="/About"
                    className={isActive("/About") ? "active" : ""}
                    onClick={closeMenu}
                >
                    About
                </Link>

                <Link
                    to="/Services"
                    className={isActive("/Services") ? "active" : ""}
                    onClick={closeMenu}
                >
                    Services
                </Link>

               

            </nav>


            {/* =====================================================
                RIGHT SIDE
            ===================================================== */}

            <div className="welcome-navbar-right">

                <Link
                    className="login-btn"
                    to="/signin"
                    onClick={closeMenu}
                >
                    Login
                </Link>


                {/* HAMBURGER */}

                <button
                    className="hamburger-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>

            </div>

        </header>
    );
}

export default WelcomeNavbar;