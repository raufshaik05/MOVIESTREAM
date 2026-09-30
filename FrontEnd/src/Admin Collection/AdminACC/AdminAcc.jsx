
import React, { useState } from "react";
import "./admin.css";
import { Link } from "react-router-dom";

function AdminAcc() {

    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>

            <div className="container">

                {/* =========================================
                    MOBILE OVERLAY
                ========================================= */}

                <div
                    className={`admin-overlay ${
                        menuOpen ? "show" : ""
                    }`}
                    onClick={closeMenu}
                ></div>


                {/* =========================================
                    SIDEBAR
                ========================================= */}

                <aside
                    className={`sidebar ${
                        menuOpen ? "mobile-open" : ""
                    }`}
                >

                    {/* Sidebar Header */}

                    <div className="sidebar-header">

                        <div className="sidebar-logo">
                            Movie<span>Stream</span>
                        </div>

                        <button
                            className="sidebar-close"
                            onClick={closeMenu}
                        >
                            ×
                        </button>

                    </div>


                    {/* Navigation */}

                    <nav className="nav-menu">

                        <div className="nav-item active">

                            <span className="nav-icon">
                                🎬
                            </span>

                            <span>
                                Dashboard
                            </span>

                        </div>


                        <div className="nav-item">

                            <span className="nav-icon">
                                🎞
                            </span>

                            <span>
                                <Link
                                    to="/movies"
                                    onClick={closeMenu}
                                >
                                    Movies
                                </Link>
                            </span>

                        </div>


                        <div className="nav-item">

                            <span className="nav-icon">
                                ➕
                            </span>

                            <span>
                                <Link
                                    to="/AddMovie"
                                    onClick={closeMenu}
                                >
                                    Add Movie
                                </Link>
                            </span>

                        </div>


                        <div className="nav-item">

                            <span className="nav-icon">
                                ✏️
                            </span>

                            <span>
                                <Link
                                    to="/AdminEditMovie"
                                    onClick={closeMenu}
                                >
                                    Edit
                                </Link>
                            </span>

                        </div>


                        <div className="nav-item">

                            <span className="nav-icon">
                                🏠
                            </span>

                            <span>
                                <Link
                                    to="/Home"
                                    onClick={closeMenu}
                                >
                                    Home
                                </Link>
                            </span>

                        </div>


                        <div className="nav-item">

                            <span className="nav-icon">
                                👥
                            </span>

                            <span>
                                Users
                            </span>

                        </div>


                        <div className="nav-item">

                            <span className="nav-icon">
                                ⚙
                            </span>

                            <span>
                                Settings
                            </span>

                        </div>

                    </nav>


                    {/* Sidebar Footer */}

                    <div className="sidebar-footer">

                        <span>
                            MOVIESTREAM
                        </span>

                        <small>
                            Admin Panel
                        </small>

                    </div>

                </aside>


                {/* =========================================
                    MAIN CONTENT
                ========================================= */}

                <main className="main-content">


                    {/* =====================================
                        HEADER
                    ===================================== */}

                    <header className="header">


                        {/* Mobile Hamburger */}

                        <button
                            className="admin-menu-btn"
                            onClick={() => setMenuOpen(true)}
                            aria-label="Open admin menu"
                        >
                            ☰
                        </button>


                        {/* Header Left */}

                        <div className="header-left">

                            <h1>
                                MOVIESTREAM ADMIN
                            </h1>

                        </div>


                        {/* Header Right */}

                        <div className="header-right">

                            <div className="notification">
                                🔔
                            </div>


                            <div className="user-info">

                                <span className="user-icon">
                                    👤
                                </span>

                                <span>
                                    Admin
                                </span>

                            </div>

                        </div>

                    </header>


                    {/* =====================================
                        CONTENT
                    ===================================== */}

                    <div className="content">


                        {/* Welcome */}

                        <div className="welcome">

                            <h2>
                                Dashboard
                            </h2>

                            <p>
                                Welcome back, Admin 👋
                            </p>

                        </div>


                        {/* =================================
                            STATS
                        ================================= */}

                        <div className="stats-grid">


                            <div className="stat-card">

                                <div className="stat-icon">
                                    🎬
                                </div>

                                <div>

                                    <div className="stat-label">
                                        Movies
                                    </div>

                                    <div className="stat-value">
                                        120
                                    </div>

                                </div>

                            </div>


                            <div className="stat-card">

                                <div className="stat-icon">
                                    👥
                                </div>

                                <div>

                                    <div className="stat-label">
                                        Users
                                    </div>

                                    <div className="stat-value">
                                        850
                                    </div>

                                </div>

                            </div>


                            <div className="stat-card">

                                <div className="stat-icon">
                                    👁
                                </div>

                                <div>

                                    <div className="stat-label">
                                        Views
                                    </div>

                                    <div className="stat-value">
                                        25.4K
                                    </div>

                                </div>

                            </div>


                            <div className="stat-card">

                                <div className="stat-icon">
                                    ₹
                                </div>

                                <div>

                                    <div className="stat-label">
                                        Revenue
                                    </div>

                                    <div className="stat-value">
                                        ₹...
                                    </div>

                                </div>

                            </div>


                        </div>


                        {/* =================================
                            RECENT MOVIES
                        ================================= */}

                        <h3 className="section-title">
                            Recent Movies
                        </h3>


                        <div className="table-container">

                            <table>

                                <thead>

                                    <tr>

                                        <th>
                                            Poster
                                        </th>

                                        <th>
                                            Movie
                                        </th>

                                        <th>
                                            Rating
                                        </th>

                                        <th>
                                            Year
                                        </th>

                                        <th>
                                            Edit
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    <tr>

                                        <td
                                            colSpan={5}
                                            className="empty-table"
                                        >
                                            No movies to display
                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </main>

            </div>

        </>
    );
}

export default AdminAcc;

