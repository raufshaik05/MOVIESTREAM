const express = require("express");

const card = express.Router();

const cardModel = require("../models/cardBD.js");


card.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const cardData = await cardModel.findById(id);

        console.log(cardData);


         if (!cardData) {

            return res.status(404).json({
                success: false,
                message: "page not found"
            });

        }

        res.status(200).json({
            success: true,
            data: cardData
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});



module.exports = card