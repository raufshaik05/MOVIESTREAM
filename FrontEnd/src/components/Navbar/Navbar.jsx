
import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

import {
    FaHome,
    FaFilm,
    FaTv,
    FaHeart,
    FaBars,
    FaTimes,
    FaUser,
    FaShieldAlt,
} from "react-icons/fa";

import { GiNinjaHeroicStance } from "react-icons/gi";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <nav className="navbar">

                {/* LOGO */}
                <div className="logo">
                    <Link to="/Home" onClick={closeMenu}>
                        <h2>
                            Movie<span>Stream</span>
                        </h2>
                    </Link>
                </div>


                {/* DESKTOP NAVIGATION */}
                <ul className="nav-links">

                    <li>
                        <Link className="active" to="/Home">
                            <FaHome />
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link to="/movies">
                            <FaFilm />
                            Movies
                        </Link>
                    </li>

                    <li>
                        <Link to="/webseries">
                            <FaTv />
                            Web Series
                        </Link>
                    </li>

                    <li>
                        <Link to="/anime">
                            <GiNinjaHeroicStance />
                            Anime
                        </Link>
                    </li>

                </ul>


                {/* DESKTOP RIGHT SIDE */}
                <div className="nav-right">

                    <Link to="/wishlist">
                        <button
                            className="icon-btn"
                            aria-label="Wishlist"
                        >
                            <FaHeart />
                        </button>
                    </Link>


                    {user?.role === "admin" && (
                        <Link
                            className="login-btn"
                            to="/AdminAcc"
                        >
                            Admin
                        </Link>
                    )}


                    <Link
                        className="login-btn"
                        to="/Profile"
                    >
                        Profile
                    </Link>

                </div>


                {/* MOBILE HAMBURGER */}
                <button
                    className={`hamburger-btn ${menuOpen ? "open" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>

            </nav>


            {/* MOBILE BACKGROUND OVERLAY */}
            <div
                className={`mobile-overlay ${
                    menuOpen ? "show" : ""
                }`}
                onClick={closeMenu}
            ></div>


            {/* MOBILE SIDE MENU */}
            <aside
                className={`mobile-menu ${
                    menuOpen ? "show" : ""
                }`}
            >

                {/* MENU HEADER */}
                <div className="mobile-menu-header">

                    <h3>
                        Movie<span>Stream</span>
                    </h3>

                    <button
                        className="mobile-close-btn"
                        onClick={closeMenu}
                    >
                        <FaTimes />
                    </button>

                </div>


                {/* MOBILE LINKS */}
                <ul className="mobile-nav-links">

                    <li>
                        <Link
                            to="/Home"
                            onClick={closeMenu}
                        >
                            <FaHome />
                            <span>Home</span>
                        </Link>
                    </li>


                    <li>
                        <Link
                            to="/movies"
                            onClick={closeMenu}
                        >
                            <FaFilm />
                            <span>Movies</span>
                        </Link>
                    </li>


                    <li>
                        <Link
                            to="/webseries"
                            onClick={closeMenu}
                        >
                            <FaTv />
                            <span>Web Series</span>
                        </Link>
                    </li>


                    <li>
                        <Link
                            to="/anime"
                            onClick={closeMenu}
                        >
                            <GiNinjaHeroicStance />
                            <span>Anime</span>
                        </Link>
                    </li>


                    <li>
                        <Link
                            to="/wishlist"
                            onClick={closeMenu}
                        >
                            <FaHeart />
                            <span>Wishlist</span>
                        </Link>
                    </li>


                    {user?.role === "admin" && (
                        <li>
                            <Link
                                to="/AdminAcc"
                                onClick={closeMenu}
                            >
                                <FaShieldAlt />
                                <span>Admin</span>
                            </Link>
                        </li>
                    )}


                    <li>
                        <Link
                            to="/Profile"
                            onClick={closeMenu}
                        >
                            <FaUser />
                            <span>Profile</span>
                        </Link>
                    </li>

                </ul>


                {/* MENU FOOTER */}
                <div className="mobile-menu-footer">
                    <span>MovieStream</span>
                    <small>
                        Your Entertainment. Your World.
                    </small>
                </div>

            </aside>
        </>
    );
}

export default Navbar;

