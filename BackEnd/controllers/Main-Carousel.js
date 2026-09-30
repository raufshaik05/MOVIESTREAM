const express = require('express')
const carousel = express.Router()


const CarouselDB = require("../models/CarouselDB.js")


carousel.get("/", async(req, res) => {
    try {
        const movie = await CarouselDB.find();

        res.status(200).json({
            success: true,
            data: movie
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
})


module.exports = carousel