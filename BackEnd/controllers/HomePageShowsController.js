

const express = require('express')
const HomePageShows = express.Router()


const HomePageShowsModel = require("../models/HomePageShowsCardData.js")

HomePageShows.get("/", async (req, res) => {

    try {

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10

        let skip = (page - 1) * limit

        const totalMovies = await HomePageShowsModel.countDocuments();

        const HomePageShowsData = await HomePageShowsModel.find()
            .skip(skip)
            .limit(limit);

        // console.log(HomePageShowsData);

        res.status(201).json({
            success: true,
            page,
            limit,
            totalMovies,
            data: HomePageShowsData
        })
    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }

})

module.exports = HomePageShows
