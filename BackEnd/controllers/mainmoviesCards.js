const express = require("express");

const movieCard = express.Router();

const movieCardModel = require("../models/MoviesCardDB.js");


// ==========================================
// GET ALL MOVIES
// PAGINATION
// ==========================================

movieCard.get("/", async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;


        const language = req.query.language;
        
        const filter = {}; if (language && language !== "All") { filter.language = language; }

        const totalMovies = await movieCardModel.countDocuments();       






        const cardData =
            await movieCardModel
                .find(filter)
                .skip(skip)
                .limit(limit);


        res.status(200).json({

            success: true,

            page,

            limit,

            language: language || "All",

            totalMovies,

            data: cardData

        });

    }
    catch (error) {

        console.log(
            "GET MOVIES ERROR:",
            error.message
        );

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// ==========================================
// GET ONE MOVIE
// FOR SINGLE PAGE
// ==========================================

movieCard.get("/:id", async (req, res) => {

    try {

        const { id } = req.params;


        console.log(
            "SINGLE MOVIE ID:",
            id
        );


        const movie =
            await movieCardModel.findById(id);


        if (!movie) {

            return res.status(404).json({

                success: false,

                message: "Movie not found"

            });

        }


        res.status(200).json({

            success: true,

            data: movie

        });

    }
    catch (error) {

        console.log(
            "SINGLE MOVIE ERROR:",
            error.message
        );

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


module.exports = movieCard;