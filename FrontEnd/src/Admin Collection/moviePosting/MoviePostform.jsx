import React, { useState } from 'react';
import "./MoviePostform.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MoviePostForm() {

    const navigate = useNavigate();

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


    function handleMoviePost(e) {

        setPostMovieDetails({
            ...postMovieDetails,
            [e.target.name]: e.target.value
        });

    }


    async function postMovieApiData(e) {

        e.preventDefault();

        try {

            const movieData = {
                ...postMovieDetails,

                genre: postMovieDetails.genre
                    .split(",")
                    .map(item => item.trim()),

                cast: postMovieDetails.cast
                    .split(",")
                    .map(item => item.trim()),

                rating: Number(postMovieDetails.rating),

                year: Number(postMovieDetails.year)
            };


            console.log("Sending Movie:", movieData);


            const apiData = await axios.post(`${import.meta.env.VITE_API_URL}/api/newMoviePostData`,
                movieData,
                {
                    withCredentials: true

                }
            );


            console.log("Backend Response:", apiData.data);


            alert("Movie Added Successfully");

            // Go back to admin dashboard
            navigate("/AdminAcc");


        } catch (error) {

            console.log(
                error.response?.data || error.message
            );

        }

    }


    return (
        <>

            <div className="movie-form-card">

                <div className="form-header">

                    <h2>Add Movie</h2>

                    <p>
                        Add a new movie to your OTT platform
                    </p>

                </div>


                <form
                    className="movie-form"
                    onSubmit={postMovieApiData}
                >


                    <div className="form-group">

                        <label>
                            Movie Title
                        </label>

                        <input
                            type="text"
                            className="form-input"
                            value={postMovieDetails.title}
                            name="title"
                            placeholder="Movie Title..."
                            onChange={handleMoviePost}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Title Image URL
                        </label>

                        <input
                            type="text"
                            className="form-input"
                            value={postMovieDetails.titleImage}
                            name="titleImage"
                            placeholder="Title Image URL..."
                            onChange={handleMoviePost}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Poster Image URL
                        </label>

                        <input
                            type="text"
                            className="form-input"
                            value={postMovieDetails.image}
                            name="image"
                            placeholder="Poster Image URL..."
                            onChange={handleMoviePost}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            className="form-textarea"
                            value={postMovieDetails.description}
                            name="description"
                            placeholder="Movie Description..."
                            onChange={handleMoviePost}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Genres
                        </label>

                        <input
                            type="text"
                            className="form-input"
                            value={postMovieDetails.genre}
                            name="genre"
                            placeholder="Action, Drama, Thriller"
                            onChange={handleMoviePost}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Language
                        </label>

                        <input
                            type="text"
                            className="form-input"
                            value={postMovieDetails.language}
                            name="language"
                            placeholder="Language"
                            onChange={handleMoviePost}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Rating
                        </label>

                        <input
                            type="number"
                            className="form-input"
                            value={postMovieDetails.rating}
                            name="rating"
                            placeholder="Rating"
                            onChange={handleMoviePost}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Release Year
                        </label>

                        <input
                            type="number"
                            className="form-input"
                            value={postMovieDetails.year}
                            name="year"
                            placeholder="Release Year"
                            onChange={handleMoviePost}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Duration
                        </label>

                        <input
                            type="text"
                            className="form-input"
                            value={postMovieDetails.duration}
                            name="duration"
                            placeholder="2h 45m"
                            onChange={handleMoviePost}
                        />

                    </div>


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


                    <div className="form-group">

                        <label>
                            Director
                        </label>

                        <input
                            type="text"
                            className="form-input"
                            value={postMovieDetails.director}
                            name="director"
                            placeholder="Director Name"
                            onChange={handleMoviePost}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Cast
                        </label>

                        <input
                            type="text"
                            className="form-input"
                            value={postMovieDetails.cast}
                            name="cast"
                            placeholder="Actor1, Actor2, Actor3"
                            onChange={handleMoviePost}
                        />

                    </div>


                    <div className="form-group full-width">

                        <label>
                            Trailer URL
                        </label>

                        <input
                            type="text"
                            className="form-input"
                            value={postMovieDetails.trailer}
                            name="trailer"
                            placeholder="Trailer URL"
                            onChange={handleMoviePost}
                        />

                    </div>

                    <div className="form-group full-width">

                        <label>
                            Movie Type
                        </label>

                        <select
                            className="form-select"
                            value={postMovieDetails.contentType}
                            name="contentType"
                            onChange={handleMoviePost}
                        >
                            <option value="movie">Movie</option>
                            <option value="web-series">Web Series</option>
                            <option value="anime">Anime</option>
                        </select>

                    </div>




                    <div className="buttons">

                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            Add Movie
                        </button>


                        <button
                            type="reset"
                            className="submit-btn"
                        >
                            RESET
                        </button>

                    </div>

                </form>

            </div>

        </>
    );
}

export default MoviePostForm;