


    const mongoose = require('mongoose')


    const AnimeMainCarouselSchema = mongoose.Schema({

        title: {
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
        language: {
            type: String,
            enum: [
                "Hindi",
                "English",
                "Telugu",
                "Tamil",
                "Kannada"
            ],
            required: true
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


    const AnimeMainCarouselModel = mongoose.model("AnimeMainCarousel", AnimeMainCarouselSchema)

    module.exports = AnimeMainCarouselModel


