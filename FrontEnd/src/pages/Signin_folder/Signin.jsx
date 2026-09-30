
import React, { useState } from 'react'

import "./signin.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signin() {

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);

    const [LoginUser, setLoginUser] = useState({
        user_email: "",
        password: ""
    })

    function handleChange(e) {
        setLoginUser({ ...LoginUser, [e.target.name]: e.target.value });
    }


    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const userLoginData = await axios.post(`${import.meta.env.VITE_API_URL}/Validation/signin`, LoginUser, {
                withCredentials: true
            })
            console.log("LOGIN RESPONSE:", userLoginData.data);

            const user = userLoginData.data.data;

            localStorage.setItem("user", JSON.stringify(user));

            alert("Login Successfully");

            if (user.role === "admin") {
                navigate("/AdminAcc");
            } else {
                navigate("/Profile");
            }
            
        } catch (err) {
            console.log(err.message);
        }
    }




    return (
        <>
            <div className="signup-container">
                <div className="overlay"></div>

                <div className="signup-card">

                    <h1 className="logo">
                        𝙼𝚘𝚟𝚒𝚎<span>𝚂𝚝𝚛𝚎𝚊𝚖</span></h1>



                    <p>Welcome back! Login to continue streaming</p>

                    <form onSubmit={handleSubmit}>

                        {/* Username / Email */}
                        <div className="input-wrapper">

                            <input type="text" name="user_email" placeholder="Enter Your Username or Email" value={LoginUser.user_email} onChange={handleChange} />
                        </div>

                        {/* Password */}
                        <div className="input-wrapper">

                            <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter Password" value={LoginUser.password} onChange={handleChange} />

                            {showPassword ? (

                                <FaEyeSlash className="eye-icon" onClick={() => setShowPassword(false)} />) : (<FaEye className="eye-icon" onClick={() => setShowPassword(true)} />)}
                        </div>

                        <button type="submit"> Login </button>

                        <p className="bottom-text"> Don't have an account? <Link className="signupStyle" to="/Signup"> Sign Up</Link></p>

                    </form>

                </div>
            </div >


        </>
    )
}

export default Signin