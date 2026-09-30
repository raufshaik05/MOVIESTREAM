

const express = require("express")

const AnimeMainCarousel = express.Router()

const AnimeMainCarouselModel = require("../../models/Anime/AnimeMainCarouselDB")


AnimeMainCarousel.get("/", async (req, res) => {

    try {
        const AnimeCarousel = await AnimeMainCarouselModel.find()
        res.status(200).json({
            success: true,
            data: AnimeCarousel
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }

})

module.exports = AnimeMainCarousel