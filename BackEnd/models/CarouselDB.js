
const mongoose = require('mongoose')

const carouselSchema = new mongoose.Schema({

    titleImage: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    video: {
        type: String
    },

    genre: {
        type: String
    },

    rating: {
        type: Number
    },

    year: {
        type: Number
    },

    isTrending: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const CarouselModel = mongoose.model("CarouselImage", carouselSchema)

module.exports = CarouselModel