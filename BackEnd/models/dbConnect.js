const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        required: true
    }
});


const OttModel = mongoose.model('movieData', movieSchema)


module.exports = OttModel