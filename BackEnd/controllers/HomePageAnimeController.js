const express = require("express");

const HomePageAnime = express.Router();

const HomePageAnimeModel = require("../models/HomePageAnimeCardsDB.js");


// ======================================================
// GET ALL ANIME + SEARCH + PAGINATION
// ======================================================

HomePageAnime.get("/", async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const search = (req.query.search || "").trim();

        const skip = (page - 1) * limit;


        // ==================================================
        // SEARCH FILTER
        // ==================================================

        let filter = {};


        if (search !== "") {

            const searchConditions = [

                // SEARCH TITLE
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },

                // SEARCH GENRE
                {
                    genre: {
                        $regex: search,
                        $options: "i"
                    }
                }

            ];


            // SEARCH YEAR
            const searchYear = Number(search);


            if (!isNaN(searchYear)) {

                searchConditions.push({
                    year: searchYear
                });

            }


            filter = {
                $or: searchConditions
            };

        }


        // ==================================================
        // TOTAL ANIME
        // ==================================================

        const totalMovies =
            await HomePageAnimeModel.countDocuments(filter);


        // ==================================================
        // GET ANIME
        // ==================================================

        const HomePageAnimeData =
            await HomePageAnimeModel
                .find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);


        // ==================================================
        // TOTAL PAGES
        // ==================================================

        const totalPages =
            Math.ceil(totalMovies / limit);


        // ==================================================
        // RESPONSE
        // ==================================================

        res.status(200).json({

            success: true,

            page,

            limit,

            totalMovies,

            totalPages,

            search,

            data: HomePageAnimeData

        });

    }


    catch (error) {

        console.log(
            "================================"
        );

        console.log(
            "ANIME SEARCH ERROR"
        );

        console.log(
            error.message
        );

        console.log(
            "================================"
        );


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// ======================================================
// GET SINGLE ANIME
// ======================================================

HomePageAnime.get("/:id", async (req, res) => {

    try {

        const { id } = req.params;


        console.log(
            "================================"
        );

        console.log(
            "SINGLE ANIME"
        );

        console.log(
            "ID:",
            id
        );

        console.log(
            "================================"
        );


        const anime =
            await HomePageAnimeModel.findById(id);


        // ==================================================
        // ANIME NOT FOUND
        // ==================================================

        if (!anime) {

            return res.status(404).json({

                success: false,

                message: "Anime not found"

            });

        }


        // ==================================================
        // SUCCESS
        // ==================================================

        res.status(200).json({

            success: true,

            data: anime

        });

    }


    catch (error) {

        console.log(
            "SINGLE ANIME ERROR:",
            error.message
        );


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


module.exports = HomePageAnime;