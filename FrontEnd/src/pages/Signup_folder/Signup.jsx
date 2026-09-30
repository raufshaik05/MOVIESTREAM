import React, { useEffect, useState } from "react";
import "./signup.css"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";



function Signup() {

    const navigate = useNavigate()

    const [passwordError, setPasswordError] = useState("");
    const [passwordValid, setPasswordValid] = useState(false);


    const [details, setDetails] = useState({
        userName: "",
        email: "",
        password: "",
    });


    function handleChange(e) {

        setDetails({ ...details, [e.target.name]: e.target.value });

    }

    // useEffect(() => {
    function regexPasswordHandle(e) {

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?]).{8,}$/;

        if (passwordRegex.test(e.target.value)) {
            setDetails({ ...details, [e.target.name]: e.target.value });
            setPasswordValid(true);
            setPasswordError("Strong password ✓");

        } else {
            setDetails({ ...details, [e.target.name]: e.target.value });
            setPasswordValid(false);
            setPasswordError("Create a strong password with 8+ characters. Start with a capital letter and include letters, numbers & symbols.");
        }
    }

    // }, [details.password])


    async function handleSubmit(e) {
        e.preventDefault()


        try {

            const userData = await axios.post(`${import.meta.env.VITE_API_URL}/Validation/signup`, details)
            console.log(userData.data);

            alert("Welcome! Your account was successfully created.");
            navigate("/signin")

        } catch (err) {
            console.log(err);
        }

    }


    return (
        <div className="signup-container">
            <div className="overlay"></div>

            <div className="signup-card">
                <h1 className="logo">
                    𝙼𝚘𝚟𝚒𝚎<span>𝚂𝚝𝚛𝚎𝚊𝚖</span></h1>

                <p>Create your account and start streaming</p>

                <form onSubmit={handleSubmit} >
                    <input type="text" value={details.userName} name="userName" placeholder="Enter Your Username" onChange={(e) => handleChange(e)} />

                    <input type="email" value={details.email} name="email" placeholder="Enter Your Email" onChange={(e) => handleChange(e)} />

                    <input type="text" value={details.password} name="password" placeholder="Enter Password" onChange={(e) => regexPasswordHandle(e)} />

                    {/* <div className="password-error">{passwordError}</div> */}
                    {details.password && (
                        <div className={passwordValid ? "password-success" : "password-error"}>
                            {passwordError}
                        </div>
                    )}

                    {/* <button type="submit" onClick={handleSubmit}>SignUP</button> */}
                    <button type="submit">SignUP</button>

                    <span> Already have an account? <Link className="signupStyle" to="/signin"> Login</Link></span>
                </form>
            </div>
        </div>
    );
}

export default Signup;