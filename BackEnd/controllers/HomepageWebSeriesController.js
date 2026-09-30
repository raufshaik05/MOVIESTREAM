const express = require("express");
const HomeWebSeries = express.Router();

const HomeWebSeriesModel = require("../models/HomePageWebseries.js");


// =====================================================
// GET WEB SERIES
// WITH LANGUAGE FILTER + PAGINATION
// =====================================================

HomeWebSeries.get("/", async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const language = req.query.language;

        const skip = (page - 1) * limit;


        // ==========================================
        // FILTER
        // ==========================================

        let filter = {};


        // If language is selected
        if (language && language !== "All") {

            filter.language = language;

        }


        // ==========================================
        // TOTAL
        // ==========================================

        const totalMovies =
            await HomeWebSeriesModel.countDocuments(filter);


        // ==========================================
        // GET DATA
        // ==========================================

        const HomeWebSeriesData =
            await HomeWebSeriesModel
                .find(filter)
                .skip(skip)
                .limit(limit);


        // ==========================================
        // RESPONSE
        // ==========================================

        res.status(200).json({

            success: true,

            page,

            limit,

            totalMovies,

            language: language || "All",

            data: HomeWebSeriesData

        });


    } catch (error) {

        console.log(
            "HOME WEB SERIES ERROR:",
            error
        );

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


// =====================================================
// GET SINGLE WEB SERIES
// =====================================================

HomeWebSeries.get("/:id", async (req, res) => {

    try {

        const { id } = req.params;


        const webSeries =
            await HomeWebSeriesModel.findById(id);


        if (!webSeries) {

            return res.status(404).json({

                success: false,

                message: "Web series not found"

            });

        }


        res.status(200).json({

            success: true,

            data: webSeries

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});


module.exports = HomeWebSeries;