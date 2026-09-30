

const express = require("express")

const AnimeShortCards = express.Router()

const AnimeShortCardsModel = require("../../models/Anime/AnimeShortCardsDB")



AnimeShortCards.get("/", async (req, res) => {

    try {

        const AnimeShortCardsData = await AnimeShortCardsModel.find()

        res.status(201).json({
            success: true,
            data: AnimeShortCardsData
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })


    }

})

module.exports = AnimeShortCards