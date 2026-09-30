
const mongoose = require('mongoose')

const HomeWebSeriesSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    titleImage: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    genre: {
        type: String,
        required: true
    },

    language: {
        type: String,
        required: true,
        enum: [
            "Telugu",
            "Hindi",
            "Tamil",
            "Malayalam",
            "Kannada",
            "English"
        ]
    },

    rating: {
        type: Number,
        required: true
    },

    year: {
        type: Number,
        required: true
    },

    duration: {
        type: String,
        required: true
    },

    certificate: {
        type: String,
        required: true
    },

    director: {
        type: String,
        required: true
    },

    cast: {
        type: [String],
        required: true
    },

    trailer: {
        type: String,
        required: true
    }

}, { timestamps: true });


const HomeWebSeriesModel = mongoose.model("HomePageWebSeries", HomeWebSeriesSchema)


module.exports = HomeWebSeriesModel