
const mongoose = require("mongoose")



const moviePostSchema = mongoose.Schema({

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
        type: [String],
        required: true
    },

    language: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        min: 0,
        max: 10,
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
        enum: ["U", "U/A", "A"],
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
    },
    contentType: {
        type: String,
        required: true,
        enum: ["movie", "web-series", "anime"]
    }

}, { timestamps: true });



const moviePostModel = mongoose.model("AdminMovie", moviePostSchema)


module.exports = moviePostModel