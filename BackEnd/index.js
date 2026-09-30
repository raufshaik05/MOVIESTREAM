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
// CORS
// =====================================================
//
// Local React frontend:
// http://localhost:5173
//
// Old production frontend:
// https://moviestream-two-iota.vercel.app
//
// Current production frontend:
// https://moviestream-wbyv.vercel.app
//
// =====================================================

const allowedOrigins = [

    // Local development
    "http://localhost:5173",

    // Old Vercel frontend
    "https://moviestream-two-iota.vercel.app",

    // Current Vercel frontend
    "https://moviestream-wbyv.vercel.app"

];


// =====================================================
// CORS MIDDLEWARE
// =====================================================

app.use(

    cors({

        origin: function (origin, callback) {

            // =================================================
            // ALLOW REQUESTS WITHOUT ORIGIN
            // =================================================
            // Example:
            // Postman
            // Server-to-server requests
            // =================================================

            if (!origin) {

                return callback(null, true);

            }


            // =================================================
            // CHECK ALLOWED ORIGIN
            // =================================================

            if (allowedOrigins.includes(origin)) {

                return callback(null, true);

            }


            // =================================================
            // BLOCK UNKNOWN ORIGIN
            // =================================================

            console.log(
                "Blocked CORS origin:",
                origin
            );

            return callback(
                new Error("Not allowed by CORS")
            );

        },


        // =================================================
        // COOKIES
        // =================================================

        credentials: true,


        // =================================================
        // ALLOWED METHODS
        // =================================================

        methods: [

            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS"

        ],


        // =================================================
        // ALLOWED HEADERS
        // =================================================

        allowedHeaders: [

            "Content-Type",
            "Authorization"

        ]

    })

);


// =====================================================
// BASIC MIDDLEWARE
// =====================================================

app.use(express.json());

app.use(cookieParser());


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
    require(
        "./controllers/mainWebseries/webSeriesCardsController.js"
    );


app.use(
    "/api/WebseriesShortCards",
    WebseriesShortCards
);


// =====================================================
// ANIME
// =====================================================

const MainAnimeCarousel =
    require(
        "./controllers/MainAnime/AnimeMainCarouselController.js"
    );


const MainAnimeShortCards =
    require(
        "./controllers/MainAnime/AnimeshortCardsController.js"
    );


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
    require(
        "./controllers/WishlistController/WishlistController.js"
    );


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

        message:
            "MOVIESTREAM Backend API is running",

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

        console.log(
            "Connected to MongoDB!"
        );

    }

    catch (err) {

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

        // =================================================
        // CONNECT DATABASE
        // =================================================

        await connectDB();


        // =================================================
        // START EXPRESS SERVER
        // =================================================

        app.listen(
            PORT,
            () => {

                console.log(
                    `Server is running on port ${PORT}`
                );


                console.log(
                    "Allowed frontend origins:"
                );


                allowedOrigins.forEach(
                    (origin) => {

                        console.log(
                            `- ${origin}`
                        );

                    }
                );

            }
        );

    }

    catch (error) {

        console.error(
            "Server startup error:",
            error.message
        );

        process.exit(1);

    }

};


// =====================================================
// START APPLICATION
// =====================================================

startServer();