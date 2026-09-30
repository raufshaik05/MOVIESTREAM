
const express = require('express')

const mainWebSeries = express()

const WebCarouselMOdel = require("../models/mainWebSeriesCarousel.js")



mainWebSeries.get("/", async (req, res) => {
    try {
        const webSeries = await WebCarouselMOdel.find()

        res.status(200).json({
            success: true,
            data: webSeries
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

})

module.exports = mainWebSeries