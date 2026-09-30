import React, {
    useEffect,
    useState
} from "react";

import axios from "axios";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    FaArrowLeft,
    FaStar,
    FaPlay,
    FaPlus,
    FaCheck,
    FaClock,
    FaEdit
} from "react-icons/fa";

import "./singlePage.css";

import Footer from "../Footer/Footer";


function SinglePage() {

    const navigate = useNavigate();

    const {
        type,
        id
    } = useParams();


    // =====================================================
    // API URL
    // =====================================================

    const API_URL =
        import.meta.env.VITE_API_URL;


    // =====================================================
    // CONTENT STATE
    // =====================================================

    const [movie, setMovie] =
        useState(null);

    const [loading, setLoading] =
        useState(true);


    // =====================================================
    // WISHLIST STATE
    // =====================================================

    const [isInWishlist, setIsInWishlist] =
        useState(false);

    const [wishlistId, setWishlistId] =
        useState(null);

    const [wishlistLoading, setWishlistLoading] =
        useState(false);


    // =====================================================
    // GET USER
    // =====================================================

    function getUser() {

        try {

            const storedUser =
                localStorage.getItem("user");

            if (!storedUser) {
                return null;
            }

            return JSON.parse(storedUser);

        } catch (error) {

            console.log(
                "USER ERROR:",
                error
            );

            return null;

        }

    }


    // =====================================================
    // GET USER ID
    // =====================================================

    function getUserId() {

        const user =
            getUser();

        if (!user) {
            return null;
        }

        return (
            user._id ||
            user.id ||
            user.userId
        );

    }


    // =====================================================
    // CHECK ADMIN
    // =====================================================

    function isAdmin() {

        const user =
            getUser();

        return (
            user &&
            user.role === "admin"
        );

    }


    // =====================================================
    // FETCH SINGLE CONTENT
    // =====================================================

    useEffect(() => {

        if (type && id) {

            getContentDetails();

        }

    }, [type, id]);


    // =====================================================
    // GET SINGLE CONTENT DETAILS
    // =====================================================

    async function getContentDetails() {

        try {

            setLoading(true);

            setMovie(null);


            console.log(
                "========================================"
            );

            console.log(
                "SINGLE PAGE"
            );

            console.log(
                "TYPE:",
                type
            );

            console.log(
                "ID:",
                id
            );

            console.log(
                "API URL:",
                API_URL
            );

            console.log(
                "========================================"
            );


            let url = "";


            // =================================================
            // NORMAL MOVIE
            // =================================================

            if (type === "movie") {

                url =
                    `${API_URL}/api/MainMovieCard/${id}`;

            }


            // =================================================
            // WEB SERIES
            // =================================================

            else if (
                type === "webseries" ||
                type === "web-series"
            ) {

                url =
                    `${API_URL}/api/HomeWebSeriesCard/${id}`;

            }


            // =================================================
            // ANIME
            // =================================================

            else if (type === "anime") {

                url =
                    `${API_URL}/api/HomePageAnime/${id}`;

            }


            // =================================================
            // ADMIN POSTED MOVIE
            // =================================================

            else if (type === "newmovie") {

                url =
                    `${API_URL}/api/newMoviePostData/movie/${id}`;

            }


            // =================================================
            // INVALID TYPE
            // =================================================

            else {

                console.log(
                    "INVALID CONTENT TYPE:",
                    type
                );

                setMovie(null);

                return;

            }


            // =================================================
            // REQUEST URL
            // =================================================

            console.log(
                "REQUEST URL:",
                url
            );


            // =================================================
            // API REQUEST
            // =================================================

            const response =
                await axios.get(url);


            // =================================================
            // RESPONSE
            // =================================================

            console.log(
                "SINGLE PAGE RESPONSE:",
                response.data
            );


            // =================================================
            // GET CONTENT DATA
            // =================================================

            const content =
                response.data?.data ||
                response.data?.movie ||
                response.data?.content ||
                response.data;


            // =================================================
            // CHECK CONTENT
            // =================================================

            if (
                content &&
                typeof content === "object" &&
                !Array.isArray(content)
            ) {

                console.log(
                    "CONTENT FOUND:",
                    content
                );

                setMovie(content);

            } else {

                console.log(
                    "CONTENT NOT FOUND"
                );

                setMovie(null);

            }

        } catch (error) {

            console.log(
                "========================================"
            );

            console.log(
                "SINGLE PAGE ERROR"
            );

            console.log(
                "STATUS:",
                error.response?.status
            );

            console.log(
                "BACKEND RESPONSE:",
                error.response?.data
            );

            console.log(
                "MESSAGE:",
                error.message
            );

            console.log(
                "========================================"
            );

            setMovie(null);

        } finally {

            setLoading(false);

        }

    }


    // =====================================================
    // CHECK WISHLIST WHEN CONTENT LOADS
    // =====================================================

    useEffect(() => {

        if (movie) {

            checkWishlist();

        }

    }, [
        movie,
        type,
        id
    ]);


    // =====================================================
    // CHECK WISHLIST
    // =====================================================

    async function checkWishlist() {

        try {

            const userId =
                getUserId();


            if (
                !userId ||
                !movie
            ) {

                setIsInWishlist(false);

                setWishlistId(null);

                return;

            }


            const response =
                await axios.get(
                    `${API_URL}/api/wishlist/${userId}`,
                    {
                        withCredentials: true
                    }
                );


            const wishlist =
                response.data?.data || [];


            // =================================================
            // DETERMINE WISHLIST TYPE
            // =================================================

            let wishlistType =
                "movie";


            if (
                type === "webseries" ||
                type === "web-series"
            ) {

                wishlistType =
                    "webseries";

            }

            else if (
                type === "anime"
            ) {

                wishlistType =
                    "anime";

            }


            // =================================================
            // FIND CONTENT
            // =================================================

            const existingItem =
                wishlist.find(
                    (item) => {

                        return (
                            String(
                                item.contentId
                            ) === String(id)

                            &&

                            item.contentType ===
                            wishlistType
                        );

                    }
                );


            // =================================================
            // FOUND
            // =================================================

            if (existingItem) {

                setIsInWishlist(true);

                setWishlistId(
                    existingItem._id
                );

            }

            // =================================================
            // NOT FOUND
            // =================================================

            else {

                setIsInWishlist(false);

                setWishlistId(null);

            }

        } catch (error) {

            console.log(
                "WISHLIST CHECK ERROR:",
                error.response?.data ||
                error.message
            );

        }

    }


    // =====================================================
    // ADD / REMOVE WISHLIST
    // =====================================================

    async function handleWishlist() {

        const userId =
            getUserId();


        // =================================================
        // LOGIN CHECK
        // =================================================

        if (!userId) {

            alert(
                "Please login to add content to your wishlist."
            );

            navigate("/signin");

            return;

        }


        if (!movie) {
            return;
        }


        try {

            setWishlistLoading(true);


            // =================================================
            // REMOVE FROM WISHLIST
            // =================================================

            if (
                isInWishlist &&
                wishlistId
            ) {

                await axios.delete(
                    `${API_URL}/api/wishlist/${wishlistId}`,
                    {
                        withCredentials: true
                    }
                );


                setIsInWishlist(false);

                setWishlistId(null);

                return;

            }


            // =================================================
            // DETERMINE CONTENT TYPE
            // =================================================

            let wishlistType =
                "movie";


            if (
                type === "webseries" ||
                type === "web-series"
            ) {

                wishlistType =
                    "webseries";

            }

            else if (
                type === "anime"
            ) {

                wishlistType =
                    "anime";

            }


            // =================================================
            // WISHLIST DATA
            // =================================================

            const wishlistData = {

                userId,

                contentId:
                    id,

                contentType:
                    wishlistType,

                title:
                    movie.title,

                image:
                    movie.image,

                rating:
                    movie.rating || 0,

                year:
                    movie.year

            };


            console.log(
                "WISHLIST DATA:",
                wishlistData
            );


            // =================================================
            // ADD TO WISHLIST
            // =================================================

            const response =
                await axios.post(
                    `${API_URL}/api/wishlist`,
                    wishlistData,
                    {
                        withCredentials: true
                    }
                );


            console.log(
                "WISHLIST RESPONSE:",
                response.data
            );


            setIsInWishlist(true);

            setWishlistId(
                response.data?.data?._id
            );

        } catch (error) {

            console.log(
                "WISHLIST ERROR:",
                error.response?.data ||
                error.message
            );


            alert(
                error.response?.data?.message ||
                "Unable to update wishlist"
            );

        } finally {

            setWishlistLoading(false);

        }

    }


    // =====================================================
    // EDIT CONTENT
    // =====================================================

    function handleEdit() {

        const user =
            getUser();


        if (
            !user ||
            user.role !== "admin"
        ) {

            alert(
                "Only admin can edit content."
            );

            return;

        }


        if (
            !movie ||
            !movie._id
        ) {

            alert(
                "Content data not available."
            );

            return;

        }


        // =================================================
        // FRONTEND TYPE
        // =================================================

        let frontendType =
            "movie";


        if (
            type === "webseries" ||
            type === "web-series"
        ) {

            frontendType =
                "webseries";

        }

        else if (
            type === "anime"
        ) {

            frontendType =
                "anime";

        }


        // =================================================
        // EDIT URL
        // =================================================

        const editUrl =
            `/AdminAcc/edit/${frontendType}/${movie._id}`;


        console.log(
            "EDIT URL:",
            editUrl
        );


        navigate(
            editUrl,
            {
                state: {

                    movieData:
                        movie,

                    contentType:
                        frontendType,

                    backendType:
                        frontendType

                }
            }
        );

    }


    // =====================================================
    // YOUTUBE EMBED URL
    // =====================================================

    function getYoutubeEmbedUrl(url) {

        if (!url) {
            return "";
        }


        try {

            const parsedUrl =
                new URL(url);


            let videoId =
                "";


            // =================================================
            // NORMAL YOUTUBE URL
            // =================================================

            if (
                (
                    parsedUrl.hostname ===
                    "youtube.com"

                    ||

                    parsedUrl.hostname ===
                    "www.youtube.com"

                    ||

                    parsedUrl.hostname.endsWith(
                        ".youtube.com"
                    )
                )

                &&

                parsedUrl.searchParams.get("v")
            ) {

                videoId =
                    parsedUrl.searchParams.get("v");

            }


            // =================================================
            // SHORT YOUTUBE URL
            // =================================================

            else if (
                parsedUrl.hostname ===
                "youtu.be"
            ) {

                videoId =
                    parsedUrl.pathname.substring(1);

            }


            // =================================================
            // EMBED URL
            // =================================================

            else if (
                (
                    parsedUrl.hostname ===
                    "youtube.com"

                    ||

                    parsedUrl.hostname ===
                    "www.youtube.com"

                    ||

                    parsedUrl.hostname.endsWith(
                        ".youtube.com"
                    )
                )

                &&

                parsedUrl.pathname.startsWith(
                    "/embed/"
                )
            ) {

                videoId =
                    parsedUrl.pathname
                        .split("/embed/")[1];

            }


            // =================================================
            // INVALID URL
            // =================================================

            else {

                console.log(
                    "Invalid YouTube trailer URL:",
                    url
                );

                return "";

            }


            // =================================================
            // CLEAN VIDEO ID
            // =================================================

            videoId =
                videoId
                    .split("&")[0]
                    .split("?")[0]
                    .trim();


            if (!videoId) {
                return "";
            }


            // =================================================
            // YOUTUBE EMBED
            // =================================================

            return (
                `https://www.youtube-nocookie.com/embed/${videoId}`
            );

        } catch (error) {

            console.log(
                "TRAILER URL ERROR:",
                error
            );

            return "";

        }

    }


    // =====================================================
    // CONTENT TYPE LABEL
    // =====================================================

    function getContentTypeLabel() {

        if (
            type === "webseries" ||
            type === "web-series"
        ) {

            return "WEB SERIES";

        }


        if (type === "anime") {

            return "ANIME";

        }


        return "MOVIE";

    }


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="content-details-page">

                <button
                    className="back-button"
                    onClick={() =>
                        navigate(-1)
                    }
                >

                    <FaArrowLeft />

                    <span>
                        Back
                    </span>

                </button>


                <div className="single-loading">

                    <div className="loading-spinner"></div>

                    <h2>
                        Loading...
                    </h2>

                </div>

            </div>

        );

    }


    // =====================================================
    // CONTENT NOT FOUND
    // =====================================================

    if (!movie) {

        return (

            <div className="content-details-page">

                <button
                    className="back-button"
                    onClick={() =>
                        navigate(-1)
                    }
                >

                    <FaArrowLeft />

                    <span>
                        Back
                    </span>

                </button>


                <div className="not-found">

                    <h2>
                        Content not found
                    </h2>

                    <p>
                        This content could not be found.
                    </p>


                    <button
                        className="back-home-button"
                        onClick={() =>
                            navigate("/")
                        }
                    >

                        Go Home

                    </button>

                </div>

            </div>

        );

    }


    // =====================================================
    // TRAILER
    // =====================================================

    const trailerUrl =
        getYoutubeEmbedUrl(
            movie.trailer
        );


    // =====================================================
    // CONTENT TYPE
    // =====================================================

    const contentTypeLabel =
        getContentTypeLabel();


    // =====================================================
    // MAIN PAGE
    // =====================================================

    return (

        <div className="content-details-page">


            {/* =================================================
                BACK BUTTON
            ================================================= */}

            <button
                className="back-button"
                onClick={() =>
                    navigate(-1)
                }
            >

                <FaArrowLeft />

                <span>
                    Back
                </span>

            </button>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <section className="content-main">


                {/* =================================================
                    POSTER
                ================================================= */}

                <div className="content-poster">

                    <img
                        src={
                            movie.image ||
                            movie.poster ||
                            movie.titleImage
                        }
                        alt={
                            movie.title ||
                            "Content"
                        }
                    />

                </div>


                {/* =================================================
                    CONTENT INFORMATION
                ================================================= */}

                <div className="content-info">


                    {/* CONTENT TYPE */}

                    <span className="content-type">

                        {contentTypeLabel}

                    </span>


                    {/* TITLE */}

                    <h1>

                        {movie.title}

                    </h1>


                    {/* =================================================
                        META INFORMATION
                    ================================================= */}

                    <div className="content-meta">


                        {/* RATING */}

                        <span className="rating">

                            <FaStar />

                            {
                                movie.rating ??
                                "N/A"
                            }

                        </span>


                        {/* YEAR */}

                        <span>

                            {
                                movie.year ||
                                "N/A"
                            }

                        </span>


                        {/* DURATION */}

                        <span>

                            <FaClock />

                            {
                                movie.duration ||
                                "N/A"
                            }

                        </span>


                        {/* CERTIFICATE */}

                        <span className="certificate">

                            {
                                movie.certificate ||
                                "N/A"
                            }

                        </span>

                    </div>


                    {/* =================================================
                        GENRE
                    ================================================= */}

                    <div className="genre-list">

                        {
                            Array.isArray(
                                movie.genre
                            )

                                ?

                                movie.genre.map(
                                    (
                                        genre,
                                        index
                                    ) => (

                                        <span
                                            key={index}
                                        >

                                            {genre}

                                        </span>

                                    )
                                )

                                :

                                movie.genre && (

                                    <span>

                                        {
                                            movie.genre
                                        }

                                    </span>

                                )
                        }

                    </div>


                    {/* =================================================
                        DESCRIPTION
                    ================================================= */}

                    <p className="description">

                        {
                            movie.description ||
                            "No description available."
                        }

                    </p>


                    {/* =================================================
                        ACTION BUTTONS
                    ================================================= */}

                    <div className="content-actions">


                        {/* WATCH NOW */}

                        <button
                            type="button"
                            className="watch-button"
                        >

                            <FaPlay />

                            Watch Now

                        </button>


                        {/* WISHLIST */}

                        <button
                            type="button"
                            className={
                                `list-button ${
                                    isInWishlist
                                        ? "added-to-wishlist"
                                        : ""
                                }`
                            }
                            onClick={
                                handleWishlist
                            }
                            disabled={
                                wishlistLoading
                            }
                        >

                            {

                                wishlistLoading

                                    ?

                                    "Saving..."

                                    :

                                    isInWishlist

                                        ?

                                        <>

                                            <FaCheck />

                                            My List

                                        </>

                                        :

                                        <>

                                            <FaPlus />

                                            My List

                                        </>

                            }

                        </button>


                        {/* ADMIN EDIT */}

                        {
                            isAdmin() && (

                                <button
                                    type="button"
                                    className="edit-button"
                                    onClick={
                                        handleEdit
                                    }
                                >

                                    <FaEdit />

                                    Edit

                                </button>

                            )
                        }

                    </div>

                </div>

            </section>


            {/* =================================================
                ABOUT
            ================================================= */}

            <section className="about-section">

                <h2>
                    About
                </h2>


                <div className="about-grid">


                    {/* LANGUAGE */}

                    <div className="about-item">

                        <span>
                            Language
                        </span>

                        <strong>

                            {

                                Array.isArray(
                                    movie.language
                                )

                                    ?

                                    movie.language.join(
                                        ", "
                                    )

                                    :

                                    movie.language ||
                                    "N/A"

                            }

                        </strong>

                    </div>


                    {/* DIRECTOR */}

                    <div className="about-item">

                        <span>
                            Director
                        </span>

                        <strong>

                            {
                                movie.director ||
                                "N/A"
                            }

                        </strong>

                    </div>


                    {/* YEAR */}

                    <div className="about-item">

                        <span>
                            Year
                        </span>

                        <strong>

                            {
                                movie.year ||
                                "N/A"
                            }

                        </strong>

                    </div>


                    {/* DURATION */}

                    <div className="about-item">

                        <span>
                            Duration
                        </span>

                        <strong>

                            {
                                movie.duration ||
                                "N/A"
                            }

                        </strong>

                    </div>


                    {/* CAST */}

                    <div className="about-item cast-item">

                        <span>
                            Cast
                        </span>

                        <strong>

                            {

                                Array.isArray(
                                    movie.cast
                                )

                                    ?

                                    movie.cast.join(
                                        ", "
                                    )

                                    :

                                    movie.cast ||
                                    "N/A"

                            }

                        </strong>

                    </div>

                </div>

            </section>


            {/* =================================================
                TRAILER
            ================================================= */}

            <section className="trailer-section">

                <h2>
                    Trailer
                </h2>


                <div className="trailer-container">

                    {

                        trailerUrl

                            ?

                            <iframe
                                src={trailerUrl}
                                title={
                                    `${movie.title} Trailer`
                                }
                                allow="
                                    accelerometer;
                                    autoplay;
                                    clipboard-write;
                                    encrypted-media;
                                    gyroscope;
                                    picture-in-picture;
                                    web-share
                                "
                                referrerPolicy="
                                    strict-origin-when-cross-origin
                                "
                                allowFullScreen
                            />

                            :

                            <div className="no-trailer">

                                <FaPlay />

                                <p>
                                    Trailer Coming Soon
                                </p>

                            </div>

                    }

                </div>

            </section>


            {/* =================================================
                FOOTER
            ================================================= */}

            <Footer />

        </div>

    );

}


export default SinglePage;