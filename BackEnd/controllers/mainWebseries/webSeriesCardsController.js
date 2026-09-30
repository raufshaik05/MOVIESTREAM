const express = require("express");

const WebseriesCards = express.Router();

const WebseriesCardsModel = require("../../models/Webseries/webseriesCardsDB");

WebseriesCards.get("/", async (req, res) => {
    try {

        const CardsData = await WebseriesCardsModel.find();

        console.log(CardsData);

        res.status(200).json({
            success: true,
            data: CardsData
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});

module.exports = WebseriesCards;