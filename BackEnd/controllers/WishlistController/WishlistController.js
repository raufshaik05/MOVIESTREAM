const express = require("express");

const wishlist = express.Router();

const wishlistModel = require("../../models/Wishlist/Wishlist.js");


// ==========================================
// ADD MOVIE TO WISHLIST
// ==========================================

wishlist.post("/", async (req, res) => {

    try {

        const {
            userId,
            contentId,
            contentType,
            title,
            image,
            rating,
            year
        } = req.body;


        // Check if movie already exists
        const existingMovie = await wishlistModel.findOne({
            userId,
            contentId,
            contentType
        });


        if (existingMovie) {

            return res.status(400).json({
                success: false,
                message: "Movie already exists in wishlist"
            });

        }


        // Create wishlist movie
        const wishlistData = new wishlistModel({

            userId,
            contentId,
            contentType,
            title,
            image,
            rating,
            year

        });


        // Save to MongoDB
        await wishlistData.save();


        res.status(201).json({

            success: true,
            message: "Movie added to wishlist",
            data: wishlistData

        });


    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

});


// ==========================================
// GET USER WISHLIST
// ==========================================

wishlist.get("/:userId", async (req, res) => {

    try {

        const { userId } = req.params;


        const wishlistData = await wishlistModel.find({
            userId: userId
        }).sort({
            createdAt: -1
        });


        res.status(200).json({

            success: true,
            data: wishlistData

        });


    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

});


// ==========================================
// REMOVE MOVIE FROM WISHLIST
// ==========================================

wishlist.delete("/:id", async (req, res) => {

    try {

        const { id } = req.params;


        const deletedMovie = await wishlistModel.findByIdAndDelete(id);


        if (!deletedMovie) {

            return res.status(404).json({

                success: false,
                message: "Wishlist movie not found"

            });

        }


        res.status(200).json({

            success: true,
            message: "Movie removed from wishlist",
            data: deletedMovie

        });


    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

});


module.exports = wishlist;