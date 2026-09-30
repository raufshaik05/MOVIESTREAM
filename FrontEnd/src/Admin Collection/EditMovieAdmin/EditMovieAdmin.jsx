import React, { useEffect, useState } from "react";
import "./editMovieAdmin.css";
import axios from "axios";
import {
    useNavigate,
    useParams,
    useLocation
} from "react-router-dom";


function MovieEditForm() {

    const navigate = useNavigate();

    const { type, id } = useParams();

    const location = useLocation();


    // =====================================================
    // DATA PASSED FROM SINGLE PAGE
    // =====================================================

    const passedMovieData =
        location.state?.movieData;


    // =====================================================
    // GET BACKEND CONTENT TYPE
    // =====================================================

    function getBackendType() {

        if (
            type === "newmovie" ||
            type === "movie"
        ) {
            return "movie";
        }

        if (
            type === "webseries" ||
            type === "web-series"
        ) {
            return "web-series";
        }

        if (type === "anime") {
            return "anime";
        }

        return null;
    }


    // =====================================================
    // GET FRONTEND CONTENT TYPE
    // =====================================================

    function getFrontendType() {

        if (
            type === "newmovie" ||
            type === "movie"
        ) {
            return type;
        }

        if (
            type === "webseries" ||
            type === "web-series"
        ) {
            return type;
        }

        if (type === "anime") {
            return "anime";
        }

        return "movie";
    }


    // =====================================================
    // FORM STATE
    // =====================================================

    const [postMovieDetails, setPostMovieDetails] = useState({

        title: "",
        titleImage: "",
        image: "",
        description: "",
        genre: "",
        language: "",
        rating: "",
        year: "",
        duration: "",
        certificate: "U/A",
        director: "",
        cast: "",
        trailer: "",
        contentType: "movie"

    });


    const [loading, setLoading] = useState(true);

    const [updating, setUpdating] = useState(false);


    // =====================================================
    // HANDLE INPUT
    // =====================================================

    function handleMoviePost(e) {

        const {
            name,
            value
        } = e.target;


        setPostMovieDetails(previousData => ({

            ...previousData,

            [name]: value

        }));

    }


    // =====================================================
    // NORMALIZE CERTIFICATE
    // =====================================================

    function normalizeCertificate(value) {

        if (!value) {

            return "U/A";

        }


        const certificate =
            String(value)
                .trim()
                .toUpperCase();


        if (certificate === "UA") {

            return "U/A";

        }


        if (certificate === "U/A") {

            return "U/A";

        }


        if (certificate === "U") {

            return "U";

        }


        if (certificate === "A") {

            return "A";

        }


        return "U/A";

    }


    // =====================================================
    // FORMAT ARRAY
    // =====================================================

    function formatArray(value) {

        if (Array.isArray(value)) {

            return value.join(", ");

        }


        return value || "";

    }


    // =====================================================
    // FORMAT TRAILER
    // =====================================================

    function formatTrailer(value) {

        if (Array.isArray(value)) {

            return value[0] || "";

        }


        return value || "";

    }


    // =====================================================
    // FORMAT MOVIE DATA
    // =====================================================

    function formatMovieData(movie) {

        if (!movie) {

            return;

        }


        console.log(
            "=================================="
        );

        console.log(
            "MOVIE DATA RECEIVED"
        );

        console.log(
            movie
        );

        console.log(
            "=================================="
        );


        setPostMovieDetails({

            title:
                movie.title || "",


            titleImage:
                movie.titleImage || "",


            image:
                movie.image || "",


            description:
                movie.description || "",


            genre:
                formatArray(movie.genre),


            language:
                movie.language || "",


            rating:
                movie.rating ?? "",


            year:
                movie.year ?? "",


            duration:
                movie.duration || "",


            certificate:
                normalizeCertificate(
                    movie.certificate
                ),


            director:
                movie.director || "",


            cast:
                formatArray(movie.cast),


            trailer:
                formatTrailer(movie.trailer),


            // IMPORTANT
            // Always use backend-normalized type
            contentType:
                getBackendType() || "movie"

        });

    }


    // =====================================================
    // GET MOVIE DATA
    // =====================================================

    useEffect(() => {

        let mounted = true;


        async function getMovieData() {

            try {

                setLoading(true);


                // =================================================
                // CHECK ID
                // =================================================

                if (!id) {

                    throw new Error(
                        "Content ID is missing"
                    );

                }


                // =================================================
                // GET BACKEND TYPE
                // =================================================

                const backendType =
                    getBackendType();


                if (!backendType) {

                    throw new Error(
                        "Invalid content type"
                    );

                }


                console.log(
                    "=================================="
                );

                console.log(
                    "GET CONTENT"
                );

                console.log(
                    "FRONTEND TYPE:",
                    type
                );

                console.log(
                    "BACKEND TYPE:",
                    backendType
                );

                console.log(
                    "CONTENT ID:",
                    id
                );

                console.log("GET URL:", `${import.meta.env.VITE_API_URL}/api/newMoviePostData/${backendType}/${id}`);
                console.log("==================================");


                // =================================================
                // IF DATA CAME FROM SINGLE PAGE
                // =================================================

                if (passedMovieData) {

                    console.log(
                        "USING DATA FROM SINGLE PAGE"
                    );


                    if (mounted) {

                        formatMovieData(
                            passedMovieData
                        );

                        setLoading(false);

                    }


                    return;

                }


                // =================================================
                // GET FROM BACKEND
                // =================================================

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/newMoviePostData/${backendType}/${id}`,
                    {
                        withCredentials: true
                    }
                );


                console.log(
                    "BACKEND RESPONSE:",
                    response.data
                );


                // =================================================
                // RESPONSE DATA
                // =================================================

                const movie =

                    response.data?.data ||

                    response.data?.movie ||

                    response.data?.content ||

                    response.data;


                // =================================================
                // CHECK DATA
                // =================================================

                if (
                    !movie ||
                    (
                        !movie._id &&
                        !movie.id
                    )
                ) {

                    throw new Error(
                        "Content not found"
                    );

                }


                if (mounted) {

                    formatMovieData(
                        movie
                    );

                    setLoading(false);

                }

            }

            catch (error) {

                console.log(
                    "=================================="
                );

                console.log(
                    "GET CONTENT ERROR"
                );

                console.log(
                    "STATUS:",
                    error.response?.status
                );

                console.log(
                    "ERROR DATA:",
                    error.response?.data
                );

                console.log(
                    "ERROR MESSAGE:",
                    error.message
                );

                console.log(
                    "=================================="
                );


                if (mounted) {

                    setLoading(false);


                    alert(

                        error.response?.data?.message ||

                        error.response?.data?.error ||

                        error.message ||

                        "Failed to load content"

                    );

                }

            }

        }


        getMovieData();


        return () => {

            mounted = false;

        };


    }, [type, id, passedMovieData]);


    // =====================================================
    // UPDATE CONTENT
    // =====================================================

    async function updateMovieApiData(e) {

        e.preventDefault();


        if (updating) {

            return;

        }


        try {

            setUpdating(true);


            // =================================================
            // CHECK ID
            // =================================================

            if (!id) {

                throw new Error(
                    "Content ID is missing"
                );

            }


            // =================================================
            // GET BACKEND TYPE
            // =================================================

            const backendType =
                getBackendType();


            if (!backendType) {

                throw new Error(
                    "Invalid content type"
                );

            }


            // =================================================
            // GENRE
            // =================================================

            const genreData =

                String(
                    postMovieDetails.genre || ""
                )

                    .split(",")

                    .map(
                        item =>
                            item.trim()
                    )

                    .filter(
                        item =>
                            item.length > 0
                    );


            // =================================================
            // CAST
            // =================================================

            const castData =

                String(
                    postMovieDetails.cast || ""
                )

                    .split(",")

                    .map(
                        item =>
                            item.trim()
                    )

                    .filter(
                        item =>
                            item.length > 0
                    );


            // =================================================
            // TRAILER
            // =================================================

            const trailerData =

                String(
                    postMovieDetails.trailer || ""
                ).trim();


            // =================================================
            // CERTIFICATE
            // =================================================

            const certificateData =

                normalizeCertificate(
                    postMovieDetails.certificate
                );


            // =================================================
            // RATING
            // =================================================

            const ratingData =

                postMovieDetails.rating === ""

                    ? 0

                    : Number(
                        postMovieDetails.rating
                    );


            // =================================================
            // YEAR
            // =================================================

            const yearData =

                postMovieDetails.year === ""

                    ? new Date().getFullYear()

                    : Number(
                        postMovieDetails.year
                    );


            // =================================================
            // VALIDATION
            // =================================================

            if (
                Number.isNaN(ratingData) ||
                ratingData < 0 ||
                ratingData > 10
            ) {

                alert(
                    "Rating must be between 0 and 10."
                );

                setUpdating(false);

                return;

            }


            if (
                Number.isNaN(yearData) ||
                yearData < 1900 ||
                yearData > 2100
            ) {

                alert(
                    "Please enter a valid release year."
                );

                setUpdating(false);

                return;

            }


            // =================================================
            // FINAL UPDATE DATA
            // =================================================

            const movieData = {

                title:
                    String(
                        postMovieDetails.title || ""
                    ).trim(),


                titleImage:
                    String(
                        postMovieDetails.titleImage || ""
                    ).trim(),


                image:
                    String(
                        postMovieDetails.image || ""
                    ).trim(),


                description:
                    String(
                        postMovieDetails.description || ""
                    ).trim(),


                genre:
                    genreData,


                language:
                    String(
                        postMovieDetails.language || ""
                    ).trim(),


                rating:
                    ratingData,


                year:
                    yearData,


                duration:
                    String(
                        postMovieDetails.duration || ""
                    ).trim(),


                certificate:
                    certificateData,


                director:
                    String(
                        postMovieDetails.director || ""
                    ).trim(),


                cast:
                    castData,


                trailer:
                    trailerData,


                // VERY IMPORTANT
                contentType:
                    backendType

            };


            // =================================================
            // DEBUG
            // =================================================

            console.log(
                "=========================================="
            );

            console.log(
                "UPDATING CONTENT"
            );

            console.log(
                "FRONTEND TYPE:",
                type
            );

            console.log(
                "BACKEND TYPE:",
                backendType
            );

            console.log(
                "CONTENT ID:",
                id
            );

            console.log(
                "PUT URL:",
                `${import.meta.env.VITE_API_URL}/api/newMoviePostData/${backendType}/${id}`
            );

            console.log(
                "UPDATE DATA:",
                movieData
            );

            console.log(
                "=========================================="
            );


            // =================================================
            // PUT REQUEST
            // =================================================

            const response =
                await axios.put(

                    `${import.meta.env.VITE_API_URL}/api/newMoviePostData/${backendType}/${id}`,

                    movieData,

                    {
                        withCredentials: true,

                        headers: {
                            "Content-Type": "application/json"
                        }
                    }

                );


            // =================================================
            // RESPONSE
            // =================================================

            console.log(
                "=========================================="
            );

            console.log(
                "UPDATE RESPONSE"
            );

            console.log(
                response.status
            );

            console.log(
                response.data
            );

            console.log(
                "=========================================="
            );


            // =================================================
            // SUCCESS
            // =================================================

            if (
                response.status >= 200 &&
                response.status < 300
            ) {

                alert(
                    "Content Updated Successfully!"
                );


                navigate(

                    `/content/${getFrontendType()}/${id}`,

                    {
                        replace: true
                    }

                );

            }

        }

        catch (error) {

            console.log(
                "=========================================="
            );

            console.log(
                "UPDATE ERROR"
            );

            console.log(
                "STATUS:",
                error.response?.status
            );

            console.log(
                "RESPONSE:",
                error.response?.data
            );

            console.log(
                "MESSAGE:",
                error.message
            );

            console.log(
                "=========================================="
            );


            alert(

                error.response?.data?.message ||

                error.response?.data?.error ||

                error.message ||

                "Failed to update content"

            );

        }

        finally {

            setUpdating(false);

        }

    }


    // =====================================================
    // RESET FORM
    // =====================================================

    function resetForm() {

        if (passedMovieData) {

            formatMovieData(
                passedMovieData
            );

        }

        else {

            window.location.reload();

        }

    }


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="movie-form-card">

                <div className="form-header">

                    <h2>
                        Loading Content...
                    </h2>

                    <p>
                        Please wait...
                    </p>

                </div>

            </div>

        );

    }


    // =====================================================
    // FORM
    // =====================================================

    return (

        <div className="movie-form-card">


            {/* =========================================
                HEADER
            ========================================= */}

            <div className="form-header">

                <h2>
                    Edit Content
                </h2>

                <p>
                    Update Movie / Web Series / Anime
                </p>

            </div>


            {/* =========================================
                FORM
            ========================================= */}

            <form
                className="movie-form"
                onSubmit={updateMovieApiData}
            >


                {/* =========================================
                    TITLE
                ========================================= */}

                <div className="form-group">

                    <label>
                        Movie Title
                    </label>

                    <input
                        type="text"
                        className="form-input"
                        name="title"
                        value={postMovieDetails.title}
                        placeholder="Movie Title..."
                        onChange={handleMoviePost}
                        required
                    />

                </div>


                {/* =========================================
                    TITLE IMAGE
                ========================================= */}

                <div className="form-group">

                    <label>
                        Title Image URL
                    </label>

                    <input
                        type="text"
                        className="form-input"
                        name="titleImage"
                        value={postMovieDetails.titleImage}
                        placeholder="Title Image URL..."
                        onChange={handleMoviePost}
                    />

                </div>


                {/* =========================================
                    POSTER IMAGE
                ========================================= */}

                <div className="form-group">

                    <label>
                        Poster Image URL
                    </label>

                    <input
                        type="text"
                        className="form-input"
                        name="image"
                        value={postMovieDetails.image}
                        placeholder="Poster Image URL..."
                        onChange={handleMoviePost}
                        required
                    />

                </div>


                {/* =========================================
                    DESCRIPTION
                ========================================= */}

                <div className="form-group full-width">

                    <label>
                        Description
                    </label>

                    <textarea
                        className="form-textarea"
                        name="description"
                        value={postMovieDetails.description}
                        placeholder="Movie Description..."
                        onChange={handleMoviePost}
                        rows="5"
                    />

                </div>


                {/* =========================================
                    GENRE
                ========================================= */}

                <div className="form-group">

                    <label>
                        Genres
                    </label>

                    <input
                        type="text"
                        className="form-input"
                        name="genre"
                        value={postMovieDetails.genre}
                        placeholder="Action, Drama, Thriller"
                        onChange={handleMoviePost}
                    />

                </div>


                {/* =========================================
                    LANGUAGE
                ========================================= */}

                <div className="form-group">

                    <label>
                        Language
                    </label>

                    <input
                        type="text"
                        className="form-input"
                        name="language"
                        value={postMovieDetails.language}
                        placeholder="English"
                        onChange={handleMoviePost}
                    />

                </div>


                {/* =========================================
                    RATING
                ========================================= */}

                <div className="form-group">

                    <label>
                        Rating
                    </label>

                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        className="form-input"
                        name="rating"
                        value={postMovieDetails.rating}
                        placeholder="8.5"
                        onChange={handleMoviePost}
                    />

                </div>


                {/* =========================================
                    YEAR
                ========================================= */}

                <div className="form-group">

                    <label>
                        Release Year
                    </label>

                    <input
                        type="number"
                        min="1900"
                        max="2100"
                        className="form-input"
                        name="year"
                        value={postMovieDetails.year}
                        placeholder="2026"
                        onChange={handleMoviePost}
                    />

                </div>


                {/* =========================================
                    DURATION
                ========================================= */}

                <div className="form-group">

                    <label>
                        Duration
                    </label>

                    <input
                        type="text"
                        className="form-input"
                        name="duration"
                        value={postMovieDetails.duration}
                        placeholder="2h 45m"
                        onChange={handleMoviePost}
                    />

                </div>


                {/* =========================================
                    CERTIFICATE
                ========================================= */}

                <div className="form-group">

                    <label>
                        Certificate
                    </label>

                    <select
                        className="form-select"
                        name="certificate"
                        value={postMovieDetails.certificate}
                        onChange={handleMoviePost}
                    >

                        <option value="U">
                            U
                        </option>

                        <option value="U/A">
                            U/A
                        </option>

                        <option value="A">
                            A
                        </option>

                    </select>

                </div>


                {/* =========================================
                    DIRECTOR
                ========================================= */}

                <div className="form-group">

                    <label>
                        Director
                    </label>

                    <input
                        type="text"
                        className="form-input"
                        name="director"
                        value={postMovieDetails.director}
                        placeholder="Director Name"
                        onChange={handleMoviePost}
                    />

                </div>


                {/* =========================================
                    CAST
                ========================================= */}

                <div className="form-group">

                    <label>
                        Cast
                    </label>

                    <input
                        type="text"
                        className="form-input"
                        name="cast"
                        value={postMovieDetails.cast}
                        placeholder="Actor1, Actor2, Actor3"
                        onChange={handleMoviePost}
                    />

                </div>


                {/* =========================================
                    TRAILER
                ========================================= */}

                <div className="form-group full-width">

                    <label>
                        Trailer URL
                    </label>

                    <input
                        type="text"
                        className="form-input"
                        name="trailer"
                        value={postMovieDetails.trailer}
                        placeholder="https://www.youtube.com/watch?v=..."
                        onChange={handleMoviePost}
                    />

                    <small className="input-help">
                        Enter one YouTube trailer URL.
                    </small>

                </div>


                {/* =========================================
                    CONTENT TYPE
                ========================================= */}

                <div className="form-group full-width">

                    <label>
                        Content Type
                    </label>

                    <select
                        className="form-select"
                        name="contentType"
                        value={postMovieDetails.contentType}
                        onChange={handleMoviePost}
                    >

                        <option value="movie">
                            Movie
                        </option>

                        <option value="web-series">
                            Web Series
                        </option>

                        <option value="anime">
                            Anime
                        </option>

                    </select>

                </div>


                {/* =========================================
                    BUTTONS
                ========================================= */}

                <div className="buttons">

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={updating}
                    >

                        {updating
                            ? "Updating..."
                            : "Update Content"
                        }

                    </button>


                    <button
                        type="button"
                        className="submit-btn"
                        onClick={resetForm}
                        disabled={updating}
                    >

                        RESET

                    </button>

                </div>


            </form>

        </div>

    );

}


export default MovieEditForm;