

const express = require('express')

const shortCardMovie = express()

const shortCardsModel = require("../models/shortCardMovieDB.js")


shortCardMovie.get("/", async (req, res) => {

    try {
        const shortCardsData = await shortCardsModel.find()

        // console.log(shortCardsData);

        res.status(200).json({
            success: true,
            data: shortCardsData
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
})

module.exports = shortCardMovie