
const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({

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

    rating: {
        type: Number,
        required: true
    },

    year: {
        type: Number,
        required: true
    }

},
    { timestamps: true });


const cardModel = mongoose.model("cardModel", cardSchema)


module.exports = cardModel


