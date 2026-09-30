import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    FaTrash,
    FaPlay,
    FaArrowLeft
} from "react-icons/fa";

import "./wishlist.css";
import Footer from "../../components/Footer/Footer";


function Wishlist() {

    const navigate = useNavigate();

    const [wishlist, setWishlist] = useState([]);

    const [loading, setLoading] = useState(true);


    // =====================================
    // GET USER
    // =====================================

    function getUser() {

        try {

            const storedUser =
                localStorage.getItem("user");


            if (!storedUser) {

                return null;

            }


            return JSON.parse(storedUser);

        }

        catch (error) {

            console.log(
                "User error:",
                error
            );

            return null;

        }

    }


    // =====================================
    // GET USER ID
    // =====================================

    function getUserId() {

        const user = getUser();


        if (!user) {

            return null;

        }


        return (
            user._id ||
            user.id ||
            user.userId
        );

    }


    // =====================================
    // FETCH WISHLIST WHEN PAGE LOADS
    // =====================================

    useEffect(() => {

        fetchWishlist();

    }, []);


    // =====================================
    // FETCH WISHLIST
    // =====================================

    async function fetchWishlist() {

        try {

            setLoading(true);


            const userId = getUserId();


            // =====================================
            // USER NOT LOGGED IN
            // =====================================

            if (!userId) {

                setWishlist([]);

                return;

            }


            console.log(
                "USER ID:",
                userId
            );


            // =====================================
            // GET WISHLIST
            // =====================================

            const response = await axios.get(

                `${import.meta.env.VITE_API_URL}/api/wishlist/${userId}`

            );


            console.log(
                "WISHLIST RESPONSE:",
                response.data
            );


            setWishlist(
                response.data.data || []
            );

        }

        catch (error) {

            console.log(
                "Wishlist fetch error:",
                error.response?.data ||
                error.message
            );

        }

        finally {

            setLoading(false);

        }

    }


    // =====================================
    // REMOVE MOVIE FROM WISHLIST
    // =====================================

    async function removeWishlist(wishlistId) {

        try {

            console.log(
                "Removing wishlist:",
                wishlistId
            );


            await axios.delete(

                `${import.meta.env.VITE_API_URL}/api/wishlist/${wishlistId}`

            );


            // =====================================
            // REMOVE FROM FRONTEND
            // =====================================

            setWishlist((previous) =>

                previous.filter(

                    (item) =>
                        item._id !== wishlistId

                )

            );


        }

        catch (error) {

            console.log(
                "Remove wishlist error:",
                error.response?.data ||
                error.message
            );

        }

    }


    // =====================================
    // OPEN SINGLE PAGE
    // =====================================

    function openMovie(item) {

        const contentType =
            item.contentType;


        // =====================================
        // MOVIE
        // =====================================

        if (contentType === "movie") {

            navigate(
                `/single/movie/${item.contentId}`
            );

            return;

        }


        // =====================================
        // WEB SERIES
        // =====================================

        if (contentType === "webseries") {

            navigate(
                `/single/webseries/${item.contentId}`
            );

            return;

        }


        // =====================================
        // ANIME
        // =====================================

        if (contentType === "anime") {

            navigate(
                `/single/anime/${item.contentId}`
            );

            return;

        }


        console.log(
            "Unknown content type:",
            contentType
        );

    }


    // =====================================
    // BACK BUTTON
    // =====================================

    function goBack() {

        navigate(-1);

    }


    // =====================================
    // BROWSE MOVIES
    // =====================================

    function browseMovies() {

        navigate("/movies");

    }


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <div className="wishlist-page">

                <button
                    className="wishlist-back-button"
                    onClick={goBack}
                >

                    <FaArrowLeft />

                    <span>
                        Back
                    </span>

                </button>


                <div className="wishlist-loading">

                    <div className="wishlist-loader"></div>

                    <h2>
                        Loading Wishlist...
                    </h2>

                </div>

            </div>

        );

    }


    // =====================================
    // PAGE
    // =====================================

    return (

        <div className="wishlist-page">


            {/* =================================
                BACK BUTTON
            ================================= */}

            <button
                className="wishlist-back-button"
                onClick={goBack}
            >

                <FaArrowLeft />

                <span>
                    Back
                </span>

            </button>


            {/* =================================
                HEADER
            ================================= */}

            <div className="wishlist-header">

                <div>

                    <h1>
                        My Wishlist
                    </h1>

                    <p>
                        {wishlist.length}{" "}

                        {
                            wishlist.length === 1
                                ? "item"
                                : "items"
                        }

                    </p>

                </div>

            </div>


            {/* =================================
                EMPTY WISHLIST
            ================================= */}

            {
                wishlist.length === 0 ? (

                    <div className="empty-wishlist">

                        <div className="empty-icon">
                            ♡
                        </div>


                        <h2>
                            Your wishlist is empty
                        </h2>


                        <p>
                            Add movies, web series and
                            anime to your wishlist.
                        </p>


                        <button
                            onClick={browseMovies}
                        >
                            Browse Movies
                        </button>

                    </div>

                ) : (


                    /* =================================
                       WISHLIST GRID
                    ================================= */

                    <div className="wishlist-grid">

                        {
                            wishlist.map((item) => (

                                <div
                                    className="wishlist-card"
                                    key={item._id}
                                >


                                    {/* =================================
                                        POSTER
                                    ================================= */}

                                    <div
                                        className="wishlist-poster"
                                        onClick={() =>
                                            openMovie(item)
                                        }
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.title}
                                        />


                                        {/* PLAY OVERLAY */}

                                        <div className="wishlist-play">

                                            <FaPlay />

                                        </div>

                                    </div>


                                    {/* =================================
                                        INFORMATION
                                    ================================= */}

                                    <div className="wishlist-info">


                                        {/* TITLE */}

                                        <h3>
                                            {item.title}
                                        </h3>


                                        {/* META */}

                                        <div className="wishlist-meta">


                                            {/* RATING */}

                                            <span>
                                                ⭐ {item.rating}
                                            </span>


                                            {/* YEAR */}

                                            <span>
                                                {item.year}
                                            </span>


                                            {/* TYPE */}

                                            <span>
                                                {
                                                    item.contentType
                                                }
                                            </span>


                                        </div>


                                        {/* REMOVE BUTTON */}

                                        <button
                                            className="remove-wishlist"
                                            onClick={() =>
                                                removeWishlist(
                                                    item._id
                                                )
                                            }
                                        >

                                            <FaTrash />

                                            <span>
                                                Remove
                                            </span>

                                        </button>


                                    </div>


                                </div>

                            ))
                        }

                    </div>

                )
            }

            <Footer />


        </div>


    );

}


export default Wishlist;