// =====================================================
// MOVIESTREAM BACKEND - MAIN SERVER
// =====================================================

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// =====================================================
// PORT
// =====================================================

const PORT = process.env.PORT || 8080;


// =====================================================
// DNS
// =====================================================

const { setServers } = require("node:dns/promises");

setServers([
    "1.1.1.1",
    "8.8.8.8"
]);


// =====================================================
// ENVIRONMENT VARIABLES
// =====================================================

const JWT_SECRET = process.env.JWT_SECRET;


// =====================================================
// BASIC MIDDLEWARE
// =====================================================

app.use(express.json());

app.use(cookieParser());


// =====================================================
// CORS
// =====================================================

// Local frontend:
// http://localhost:5173
//
// Production frontend:
// https://your-project.vercel.app

const allowedOrigin =
    process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
    cors({
        origin: allowedOrigin,
        credentials: true,
        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS"
        ],
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    })
);


// =====================================================
// CONTROLLERS
// =====================================================

const carouselController =
    require("./controllers/Main-Carousel.js");

const card =
    require("./controllers/cardsController.js");

const mainMovieCard =
    require("./controllers/mainmoviesCards.js");

const shortCardMovie =
    require("./controllers/shortcardmovie.js");

const MainWebSeriesCarousel =
    require("./controllers/mainWebSeriesWebCarouselController.js");


// =====================================================
// AUTH / USER
// =====================================================

const userController =
    require("./controllers/signup.js");

const verificationJwt =
    require("./controllers/JWTverificationController.js");


// =====================================================
// HOME PAGE
// =====================================================

const HomePageWebSeries =
    require("./controllers/HomepageWebSeriesController.js");

const HomePageAnime =
    require("./controllers/HomePageAnimeController.js");

const HomePageShowsCard =
    require("./controllers/HomePageShowsController.js");


// =====================================================
// ADMIN
// =====================================================

const NewMoviePostData =
    require("./Admin/AdminControllers/moviePostingController.js");


// =====================================================
// USER VALIDATION ROUTES
// =====================================================

app.use(
    "/Validation",
    userController
);


// =====================================================
// MOVIE / HOME API ROUTES
// =====================================================

app.use(
    "/api/carousel",
    carouselController
);

app.use(
    "/api/card",
    card
);

app.use(
    "/api/MainMovieCard",
    mainMovieCard
);

app.use(
    "/api/HomeWebSeriesCard",
    HomePageWebSeries
);

app.use(
    "/api/HomePageAnime",
    HomePageAnime
);

app.use(
    "/api/HomePageShowsCard",
    HomePageShowsCard
);

app.use(
    "/api/shortCardMovies",
    shortCardMovie
);

app.use(
    "/api/MainWebSeriesCarousel",
    MainWebSeriesCarousel
);


// =====================================================
// WEB SERIES
// =====================================================

const WebseriesShortCards =
    require("./controllers/mainWebseries/webSeriesCardsController.js");

app.use(
    "/api/WebseriesShortCards",
    WebseriesShortCards
);


// =====================================================
// ANIME
// =====================================================

const MainAnimeCarousel =
    require("./controllers/MainAnime/AnimeMainCarouselController.js");

const MainAnimeShortCards =
    require("./controllers/MainAnime/AnimeshortCardsController.js");

app.use(
    "/api/AnimeMainCarousel",
    MainAnimeCarousel
);

app.use(
    "/api/AnimeShortCards",
    MainAnimeShortCards
);


// =====================================================
// ADMIN CRUD
// =====================================================

app.use(
    "/api/newMoviePostData",
    NewMoviePostData
);


// =====================================================
// WISHLIST
// =====================================================

const Wishlist =
    require("./controllers/WishlistController/WishlistController.js");

app.use(
    "/api/wishlist",
    Wishlist
);


// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "MOVIESTREAM Backend API is running",
        port: PORT
    });

});


// =====================================================
// DATABASE CONNECTION
// =====================================================

const connectDB = async () => {

    try {

        await mongoose.connect(
            process.env.DB_Connection_String
        );

        console.log("Connected to MongoDB!");

    } catch (err) {

        console.error(
            "Database Connection Error:",
            err.message
        );

        process.exit(1);

    }

};


// =====================================================
// START SERVER
// =====================================================

const startServer = async () => {

    try {

        await connectDB();

        app.listen(PORT, () => {

            console.log(
                `Server is running on port ${PORT}`
            );

            console.log(
                `Frontend allowed origin: ${allowedOrigin}`
            );

        });

    } catch (error) {

        console.error(
            "Server startup error:",
            error.message
        );

        process.exit(1);

    }

};


startServer();