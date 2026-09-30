import React, { useState } from "react";

import "./signin.css";

import axios from "axios";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    FaEye,
    FaEyeSlash
} from "react-icons/fa";


function Signin() {

    const navigate = useNavigate();

    // =====================================================
    // SHOW / HIDE PASSWORD
    // =====================================================

    const [showPassword, setShowPassword] = useState(false);


    // =====================================================
    // LOGIN USER DATA
    // =====================================================

    const [LoginUser, setLoginUser] = useState({
        user_email: "",
        password: ""
    });


    // =====================================================
    // ERROR MESSAGE
    // =====================================================

    const [error, setError] = useState("");


    // =====================================================
    // LOADING
    // =====================================================

    const [loading, setLoading] = useState(false);


    // =====================================================
    // HANDLE INPUT CHANGE
    // =====================================================

    function handleChange(e) {

        setLoginUser({
            ...LoginUser,
            [e.target.name]: e.target.value
        });

        // Clear error when user starts typing
        if (error) {
            setError("");
        }
    }


    // =====================================================
    // HANDLE LOGIN
    // =====================================================

    async function handleSubmit(e) {

        e.preventDefault();

        // Clear previous error
        setError("");


        // =================================================
        // FRONTEND VALIDATION
        // =================================================

        if (!LoginUser.user_email.trim()) {

            setError(
                "Please enter your username or email"
            );

            return;
        }


        if (!LoginUser.password.trim()) {

            setError(
                "Please enter your password"
            );

            return;
        }


        try {

            setLoading(true);


            // =================================================
            // LOGIN API
            // =================================================

            const userLoginData = await axios.post(

                `${import.meta.env.VITE_API_URL}/Validation/signin`,

                LoginUser,

                {
                    withCredentials: true
                }

            );


            console.log(
                "LOGIN RESPONSE:",
                userLoginData.data
            );


            // =================================================
            // GET USER DATA
            // =================================================

            const user = userLoginData.data.data;


            // =================================================
            // SAVE USER DATA
            // =================================================

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );


            // =================================================
            // REDIRECT
            // =================================================

            if (user.role === "admin") {

                navigate("/AdminAcc");

            } else {

                navigate("/Profile");

            }

        }


        // =====================================================
        // LOGIN ERROR
        // =====================================================

        catch (err) {

            console.log(
                "LOGIN ERROR:",
                err
            );


            // =================================================
            // BACKEND ERROR
            // =================================================

            if (err.response) {

                setError(
                    err.response.data?.message ||
                    "Login failed. Please check your details."
                );

            }


            // =================================================
            // NETWORK ERROR
            // =================================================

            else if (err.request) {

                setError(
                    "Unable to connect to the server. Please try again."
                );

            }


            // =================================================
            // OTHER ERROR
            // =================================================

            else {

                setError(
                    "Something went wrong. Please try again."
                );

            }

        }


        finally {

            setLoading(false);

        }

    }


    // =====================================================
    // JSX
    // =====================================================

    return (

        <>

            <div className="signup-container">

                <div className="overlay"></div>


                <div className="signup-card">


                    {/* =================================================
                        LOGO
                    ================================================= */}

                    <h1 className="logo">

                        𝙼𝚘𝚟𝚒𝚎
                        <span>𝚂𝚝𝚛𝚎𝚊𝚖</span>

                    </h1>


                    {/* =================================================
                        DESCRIPTION
                    ================================================= */}

                    <p>
                        Welcome back! Login to continue streaming
                    </p>


                    <form onSubmit={handleSubmit}>


                        {/* =================================================
                            ERROR MESSAGE
                        ================================================= */}

                        {error && (

                            <div className="message error-message">

                                <span className="error-icon">
                                    ⚠
                                </span>

                                <span>
                                    {error}
                                </span>

                            </div>

                        )}


                        {/* =================================================
                            USERNAME / EMAIL
                        ================================================= */}

                        <div className="input-wrapper">

                            <input

                                type="text"

                                name="user_email"

                                placeholder="Enter Your Username or Email"

                                value={LoginUser.user_email}

                                onChange={handleChange}

                                autoComplete="username"

                            />

                        </div>


                        {/* =================================================
                            PASSWORD
                        ================================================= */}

                        <div className="input-wrapper">

                            <input

                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }

                                name="password"

                                placeholder="Enter Password"

                                value={LoginUser.password}

                                onChange={handleChange}

                                autoComplete="current-password"

                            />


                            {showPassword ? (

                                <FaEyeSlash

                                    className="eye-icon"

                                    onClick={() =>
                                        setShowPassword(false)
                                    }

                                />

                            ) : (

                                <FaEye

                                    className="eye-icon"

                                    onClick={() =>
                                        setShowPassword(true)
                                    }

                                />

                            )}

                        </div>


                        {/* =================================================
                            LOGIN BUTTON
                        ================================================= */}

                        <button

                            type="submit"

                            className="signup-button"

                            disabled={loading}

                        >

                            {loading
                                ? "Logging in..."
                                : "Login"}

                        </button>


                        {/* =================================================
                            SIGN UP
                        ================================================= */}

                        <p className="bottom-text">

                            Don't have an account?

                            <Link
                                className="signupStyle"
                                to="/Signup"
                            >

                                Sign Up

                            </Link>

                        </p>


                    </form>

                </div>

            </div>

        </>

    );

}


export default Signin;