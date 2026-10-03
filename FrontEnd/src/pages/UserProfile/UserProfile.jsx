import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userProfile.css";
import { Link, useNavigate } from "react-router-dom";

import {
    FaUser,
    FaUserCircle,
    FaHeart,
    FaHistory,
    FaCog,
    FaSignOutAlt,
    FaEdit,
    FaHome,
    FaShieldAlt
} from "react-icons/fa";


function UserProfile() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = async () => {

        try {

            await axios.post(
                `${import.meta.env.VITE_API_URL}/Validation/logout`,
                {},
                {
                    withCredentials: true
                }
            );

            // Remove user information from localStorage
            localStorage.removeItem("user");

            // Go to signin page
            navigate("/signin");

        } catch (error) {

            console.log(
                error.response?.data || error.message
            );

        }

    };


    // ==========================================
    // GET LOGGED-IN USER
    // ==========================================

    useEffect(() => {

        const fetchUserData = async () => {

            try {

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/Validation/me`,
             {
                        withCredentials: true
                    }
                );

                console.log("USER DATA:", response.data);

                setUser(response.data.data);

            } catch (error) {

                console.log(
                    error.response?.data || error.message
                );

            } finally {

                setLoading(false);

            }

        };

        fetchUserData();

    }, []);


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return <h2>Loading profile...</h2>;

    }


    // ==========================================
    // USER NOT FOUND
    // ==========================================

    if (!user) {

        return <h2>User data not found</h2>;

    }


    // ==========================================
    // PROFILE PAGE
    // ==========================================

    return (

        <div className="profile-page">


            {/* =================================
                SIDEBAR
            ================================= */}

            <aside className="profile-sidebar">


                {/* Logo */}

                <div className="profile-logo">

                    MOVIE<span>STREAM</span>

                </div>


                {/* User */}

                <div className="sidebar-profile">

                    <div className="sidebar-avatar">

                        <FaUser />

                    </div>

                    <h3>
                        {user.userName}
                    </h3>

                    <p>
                        {user.email}
                    </p>

                </div>


                {/* Menu */}

                <div className="profile-menu">


                    <button className="profile-menu-item active">

                        <FaUser />

                        <span>
                            My Profile
                        </span>

                    </button>


                    <Link
                        to="/Home"
                        className="profile-menu-item"
                    >

                        {/* <FaHeart /> */}
                        <FaHome />

                        <span>
                            Home
                        </span>

                    </Link>




                    <button className="profile-menu-item">

                        <FaCog />

                        <span>
                            Settings
                        </span>

                    </button>


                    <button className="profile-menu-item">

                        <FaHistory />

                        <span>
                            Watch History
                        </span>

                    </button>


                    <button className="profile-menu-item">

                        <FaCog />

                        <span>
                            Settings
                        </span>

                    </button>


                </div>


                {/* Logout */}

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >

                    <FaSignOutAlt />

                    <span>
                        Logout
                    </span>

                </button>


            </aside>



            {/* =================================
                MAIN CONTENT
            ================================= */}

            <main className="profile-content">


                {/* =================================
                    TOP SECTION
                ================================= */}

                <div className="profile-top">

                    <div>

                        <p className="profile-small-title">
                            MY PROFILE
                        </p>

                        <h1>
                            Welcome back,{" "}
                            <span>
                                {user.userName}
                            </span>
                        </h1>

                        <p className="profile-description">
                            Manage your MOVIESTREAM profile
                        </p>

                    </div>


                    <button className="edit-button">

                        <FaEdit />

                        Edit Profile

                    </button>

                </div>



                {/* =================================
                    PROFILE CARD
                ================================= */}

                <div className="profile-card">


                    <div className="profile-card-header">


                        {/* Avatar */}

                        <div className="large-avatar">

                            <FaUserCircle />

                        </div>


                        {/* User Information */}

                        <div className="profile-user-info">

                            <h2>
                                {user.userName}
                            </h2>


                            <p>

                                <span>
                                    Email
                                </span>

                                {user.email}

                            </p>


                            <p>

                                <span>
                                    Role
                                </span>

                                {user.role}

                            </p>

                        </div>

                    </div>


                </div>



                {/* =================================
                    ACCOUNT OVERVIEW
                ================================= */}

                <section className="overview-section">

                    <h2>
                        Account Overview
                    </h2>


                    <div className="overview-grid">


                        <div className="overview-card">

                            <div className="overview-icon">

                                <FaHeart />

                            </div>

                            <div>

                                <h3>
                                    My List
                                </h3>

                                <p>
                                    Your favorite movies
                                </p>

                            </div>

                        </div>



                        <div className="overview-card">

                            <div className="overview-icon">

                                <FaHistory />

                            </div>

                            <div>

                                <h3>
                                    Watch History
                                </h3>

                                <p>
                                    Recently watched movies
                                </p>

                            </div>

                        </div>



                        <div className="overview-card">

                            <div className="overview-icon">

                                <FaShieldAlt />

                            </div>

                            <div>

                                <h3>
                                    Account Security
                                </h3>

                                <p>
                                    Your account is protected
                                </p>

                            </div>

                        </div>



                        <div className="overview-card">

                            <div className="overview-icon">

                                <FaCog />

                            </div>

                            <div>

                                <h3>
                                    Settings
                                </h3>

                                <p>
                                    Manage your preferences
                                </p>

                            </div>

                        </div>


                    </div>

                </section>



                {/* =================================
                    ACCOUNT DETAILS
                ================================= */}

                <section className="account-section">


                    <div className="section-title">

                        <div>

                            <h2>
                                Account Details
                            </h2>

                            <p>
                                Your personal account information
                            </p>

                        </div>


                        <button className="small-edit-button">

                            <FaEdit />

                            Edit

                        </button>

                    </div>



                    <div className="details-container">


                        <div className="detail-item">

                            <span>
                                USERNAME
                            </span>

                            <strong>
                                {user.userName}
                            </strong>

                        </div>



                        <div className="detail-item">

                            <span>
                                EMAIL
                            </span>

                            <strong>
                                {user.email}
                            </strong>

                        </div>



                        <div className="detail-item">

                            <span>
                                ROLE
                            </span>

                            <strong>
                                {user.role}
                            </strong>

                        </div>



                        <div className="detail-item">

                            <span>
                                USER ID
                            </span>

                            <strong>
                                {user._id}
                            </strong>

                        </div>


                    </div>

                </section>


            </main>


        </div>

    );

}


export default UserProfile;