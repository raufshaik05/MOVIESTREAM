const express = require("express");

const userController = express();

const userModel = require("./../models/user_Authentication.js");

const jwt = require("jsonwebtoken");

const verificationJwt = require("./JWTverificationController.js");


// =====================================================
// SIGNUP
// =====================================================

userController.post("/signup", async (req, res) => {

    try {

        console.log(req.body);

        const UserDetails = await userModel.create({

            userName: req.body.userName,

            email: req.body.email,

            password: req.body.password,

            role: "user"

        });

        return res.status(201).json({

            success: true,

            message: "User registered successfully",

            User: UserDetails

        });

    }

    catch (error) {

        console.log("SIGNUP ERROR:", error);

        return res.status(500).json({

            success: false,

            message: "User registration failed",

            error: error.message

        });

    }

});


// =====================================================
// SIGNIN
// =====================================================

userController.post("/signin", async (req, res) => {

    try {

        const user_email = req.body.user_email;

        const password = req.body.password;


        // =================================================
        // EMAIL REGEX
        // =================================================

        const regX =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|ai)$/;


        let fetchData;


        // =================================================
        // LOGIN USING EMAIL
        // =================================================

        if (regX.test(user_email)) {

            fetchData = await userModel.findOne({

                email: user_email

            });


            if (!fetchData) {

                return res.status(404).json({

                    success: false,

                    message: "Email not found"

                });

            }

        }


        // =================================================
        // LOGIN USING USERNAME
        // =================================================

        else if (user_email) {

            fetchData = await userModel.findOne({

                userName: user_email

            });


            if (!fetchData) {

                return res.status(404).json({

                    success: false,

                    message: "Username not found"

                });

            }

        }


        // =================================================
        // EMAIL / USERNAME EMPTY
        // =================================================

        else {

            return res.status(400).json({

                success: false,

                message: "Email or username is required"

            });

        }


        // =================================================
        // PASSWORD CHECK
        // =================================================

        if (fetchData.password !== password) {

            return res.status(401).json({

                success: false,

                message: "Incorrect password"

            });

        }


        // =================================================
        // CREATE JWT
        // =================================================

        const token = jwt.sign(

            {

                userId: fetchData._id,

                role: fetchData.role

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "1d"

            }

        );


        // =================================================
        // STORE JWT IN COOKIE
        // =================================================
        //
        // IMPORTANT FOR:
        //
        // Vercel Frontend
        //        ↓
        // Render Backend
        //
        // The frontend and backend are different origins.
        //
        // =================================================

        res.cookie("token", token, {

            httpOnly: true,

            secure: true,

            sameSite: "none",

            maxAge: 24 * 60 * 60 * 1000

        });


        // =================================================
        // SIGNIN RESPONSE
        // =================================================

        return res.status(200).json({

            success: true,

            message: "Signin successful",

            data: {

                id: fetchData._id,

                userName: fetchData.userName,

                email: fetchData.email,

                role: fetchData.role

            }

        });

    }

    catch (error) {

        console.log("SIGNIN ERROR:", error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// =====================================================
// GET CURRENT USER
// =====================================================

userController.get(
    "/me",
    verificationJwt,
    async (req, res) => {

        try {

            const user = await userModel

                .findById(req.user.userId)

                .select("-password");


            if (!user) {

                return res.status(404).json({

                    success: false,

                    message: "User not found"

                });

            }


            return res.status(200).json({

                success: true,

                message: "User data fetched successfully",

                data: user

            });

        }

        catch (error) {

            console.log("GET USER ERROR:", error);

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }
);


// =====================================================
// LOGOUT
// =====================================================

userController.post("/logout", (req, res) => {

    res.clearCookie("token", {

        httpOnly: true,

        secure: true,

        sameSite: "none"

    });


    return res.status(200).json({

        success: true,

        message: "Logout successful"

    });

});


// =====================================================
// EXPORT
// =====================================================

module.exports = userController;