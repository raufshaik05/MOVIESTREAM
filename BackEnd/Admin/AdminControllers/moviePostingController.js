const express = require("express");

const createMovie = express.Router();

const moviePostModel =
    require("../AdminModels/MoviePostingData.js");

const verificationJwt =
    require("../../controllers/JWTverificationController.js");

const requireAdmin =
    require("../../Middleware/roleMiddleware.js");


// =====================================================
// HELPER - NORMALIZE REQUEST TYPE
// =====================================================

function normalizeRequestType(type) {

    if (!type) {
        return null;
    }

    const normalized =
        String(type)
            .trim()
            .toLowerCase();


    if (
        normalized === "movie" ||
        normalized === "newmovie"
    ) {
        return "movie";
    }


    if (
        normalized === "webseries" ||
        normalized === "web-series"
    ) {
        return "web-series";
    }


    if (normalized === "anime") {
        return "anime";
    }


    return null;
}


// =====================================================
// HELPER - GET CONTENT TYPES
// =====================================================

function getContentTypes(type) {

    const normalizedType =
        normalizeRequestType(type);


    if (!normalizedType) {
        return null;
    }


    // MOVIE

    if (normalizedType === "movie") {

        return [
            "movie",
            "newmovie"
        ];
    }


    // WEB SERIES

    if (normalizedType === "web-series") {

        return [
            "web-series",
            "webseries"
        ];
    }


    // ANIME

    if (normalizedType === "anime") {

        return [
            "anime"
        ];
    }


    return null;
}


// =====================================================
// HELPER - NORMALIZE CONTENT TYPE FOR DATABASE
// =====================================================

function normalizeContentType(type) {

    const normalizedType =
        normalizeRequestType(type);


    if (normalizedType) {
        return normalizedType;
    }


    return "movie";
}


// =====================================================
// HELPER - NORMALIZE CERTIFICATE
// =====================================================

function normalizeCertificate(certificate) {

    if (!certificate) {
        return "U/A";
    }


    const value =
        String(certificate)
            .trim()
            .toUpperCase();


    if (value === "UA") {
        return "U/A";
    }


    if (value === "U/A") {
        return "U/A";
    }


    if (value === "U") {
        return "U";
    }


    if (value === "A") {
        return "A";
    }


    return "U/A";
}


// =====================================================
// HELPER - NORMALIZE TRAILER
// =====================================================

function normalizeTrailer(trailer) {

    if (Array.isArray(trailer)) {

        return trailer[0] || "";
    }


    if (typeof trailer === "string") {

        return trailer.trim();
    }


    return "";
}


// =====================================================
// HELPER - NORMALIZE ARRAY
// =====================================================

function normalizeArray(value) {

    if (Array.isArray(value)) {

        return value
            .map(item => String(item).trim())
            .filter(item => item !== "");
    }


    if (typeof value === "string") {

        return value
            .split(",")
            .map(item => item.trim())
            .filter(item => item !== "");
    }


    return [];
}


// =====================================================
// ADMIN - CREATE CONTENT
// =====================================================

createMovie.post(
    "/",
    verificationJwt,
    requireAdmin,
    async (req, res) => {

        try {

            console.log("================================");
            console.log("CREATE CONTENT");
            console.log("BODY:", req.body);
            console.log("================================");


            const movieData = {

                ...req.body,


                contentType:
                    normalizeContentType(
                        req.body.contentType
                    ),


                certificate:
                    normalizeCertificate(
                        req.body.certificate
                    ),


                trailer:
                    normalizeTrailer(
                        req.body.trailer
                    ),


                genre:
                    normalizeArray(
                        req.body.genre
                    ),


                cast:
                    normalizeArray(
                        req.body.cast
                    )

            };


            const newMovieData =
                await moviePostModel.create(
                    movieData
                );


            return res.status(201).json({

                success: true,

                message:
                    "Content added successfully",

                AdminMovies:
                    newMovieData

            });

        }

        catch (error) {

            console.log(
                "CREATE CONTENT ERROR:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    error.message

            });
        }
    }
);


// =====================================================
// GET ALL CONTENT BY TYPE
// =====================================================

createMovie.get(
    "/",
    async (req, res) => {

        try {

            const {
                type
            } = req.query;


            console.log("================================");
            console.log("GET ALL CONTENT");
            console.log("TYPE:", type);
            console.log("================================");


            const contentTypes =
                getContentTypes(type);


            if (!contentTypes) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please provide valid type: movie, webseries, web-series, or anime"

                });
            }


            const content =
                await moviePostModel
                    .find({
                        contentType: {
                            $in: contentTypes
                        }
                    })
                    .sort({
                        createdAt: -1
                    });


            return res.status(200).json({

                success: true,

                message:
                    "Content fetched successfully",

                data:
                    content

            });

        }

        catch (error) {

            console.log(
                "GET CONTENT ERROR:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    error.message

            });
        }
    }
);


// =====================================================
// GET SINGLE CONTENT
// =====================================================

createMovie.get(
    "/:type/:id",
    async (req, res) => {

        try {

            const {
                type,
                id
            } = req.params;


            console.log("================================");
            console.log("SINGLE CONTENT REQUEST");
            console.log("TYPE:", type);
            console.log("ID:", id);
            console.log("================================");


            const contentTypes =
                getContentTypes(type);


            if (!contentTypes) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid content type"

                });
            }


            const content =
                await moviePostModel.findOne({

                    _id: id,

                    contentType: {
                        $in: contentTypes
                    }

                });


            if (!content) {

                console.log(
                    "CONTENT NOT FOUND"
                );

                console.log(
                    "ID:",
                    id
                );

                console.log(
                    "EXPECTED TYPES:",
                    contentTypes
                );


                return res.status(404).json({

                    success: false,

                    message:
                        "Content not found"

                });
            }


            console.log(
                "CONTENT FOUND:",
                content._id
            );


            return res.status(200).json({

                success: true,

                message:
                    "Content fetched successfully",

                data:
                    content

            });

        }

        catch (error) {

            console.log(
                "GET SINGLE CONTENT ERROR:",
                error
            );


            if (
                error.name ===
                "CastError"
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid content ID"

                });
            }


            return res.status(500).json({

                success: false,

                message:
                    error.message

            });
        }
    }
);


// =====================================================
// ADMIN - EDIT CONTENT
// =====================================================

createMovie.put(
    "/:type/:id",
    verificationJwt,
    requireAdmin,
    async (req, res) => {

        try {

            const {
                type,
                id
            } = req.params;


            console.log("================================");
            console.log("EDIT CONTENT");
            console.log("TYPE:", type);
            console.log("ID:", id);
            console.log("BODY:", req.body);
            console.log("================================");


            // =================================================
            // CHECK REQUEST TYPE
            // =================================================

            const normalizedRequestType =
                normalizeRequestType(type);


            if (!normalizedRequestType) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid content type"

                });
            }


            // =================================================
            // FIND CONTENT ONLY BY ID
            //
            // IMPORTANT:
            //
            // We DO NOT use contentType here.
            //
            // MongoDB _id is unique.
            // This prevents:
            //
            // Content not found
            //
            // when type is slightly different.
            // =================================================

            const existingContent =
                await moviePostModel.findById(id);


            if (!existingContent) {

                console.log(
                    "UPDATE FAILED - ID NOT FOUND"
                );

                console.log(
                    "ID:",
                    id
                );


                return res.status(404).json({

                    success: false,

                    message:
                        "Content not found"

                });
            }


            console.log(
                "EXISTING CONTENT FOUND:"
            );

            console.log(
                existingContent
            );


            // =================================================
            // ALLOWED FIELDS
            // =================================================

            const allowedFields = [

                "title",

                "titleImage",

                "image",

                "description",

                "genre",

                "language",

                "rating",

                "year",

                "duration",

                "certificate",

                "director",

                "cast",

                "trailer"

            ];


            // =================================================
            // PREPARE UPDATE DATA
            // =================================================

            const updateData = {};


            allowedFields.forEach(
                (field) => {

                    if (
                        req.body[field] !==
                        undefined
                    ) {

                        updateData[field] =
                            req.body[field];

                    }

                }
            );


            // =================================================
            // NO DATA
            // =================================================

            if (
                Object.keys(updateData).length === 0
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "No content fields provided for update"

                });
            }


            // =================================================
            // NORMALIZE CERTIFICATE
            // =================================================

            if (
                req.body.certificate !==
                undefined
            ) {

                updateData.certificate =
                    normalizeCertificate(
                        req.body.certificate
                    );
            }


            // =================================================
            // NORMALIZE TRAILER
            // =================================================

            if (
                req.body.trailer !==
                undefined
            ) {

                updateData.trailer =
                    normalizeTrailer(
                        req.body.trailer
                    );
            }


            // =================================================
            // NORMALIZE GENRE
            // =================================================

            if (
                req.body.genre !==
                undefined
            ) {

                updateData.genre =
                    normalizeArray(
                        req.body.genre
                    );
            }


            // =================================================
            // NORMALIZE CAST
            // =================================================

            if (
                req.body.cast !==
                undefined
            ) {

                updateData.cast =
                    normalizeArray(
                        req.body.cast
                    );
            }


            // =================================================
            // CONTENT TYPE
            //
            // Keep the existing type unless frontend
            // explicitly sends another valid type.
            // =================================================

            if (
                req.body.contentType !==
                undefined
            ) {

                const requestedContentType =
                    normalizeRequestType(
                        req.body.contentType
                    );


                if (requestedContentType) {

                    updateData.contentType =
                        requestedContentType;

                } else {

                    updateData.contentType =
                        existingContent.contentType;

                }

            } else {

                updateData.contentType =
                    existingContent.contentType;

            }


            // =================================================
            // UPDATE DATABASE
            // =================================================

            console.log(
                "FINAL UPDATE DATA:"
            );

            console.log(
                updateData
            );


            const updatedContent =
                await moviePostModel.findByIdAndUpdate(

                    id,

                    {
                        $set: updateData
                    },

                    {
                        new: true,
                        runValidators: true
                    }

                );


            // =================================================
            // UPDATE FAILED
            // =================================================

            if (!updatedContent) {

                console.log(
                    "UPDATE FAILED"
                );

                return res.status(404).json({

                    success: false,

                    message:
                        "Content not found"

                });
            }


            // =================================================
            // SUCCESS
            // =================================================

            console.log(
                "================================"
            );

            console.log(
                "CONTENT UPDATED SUCCESSFULLY"
            );

            console.log(
                "UPDATED ID:",
                updatedContent._id
            );

            console.log(
                "UPDATED TYPE:",
                updatedContent.contentType
            );

            console.log(
                "================================"
            );


            return res.status(200).json({

                success: true,

                message:
                    "Content updated successfully",

                data:
                    updatedContent

            });

        }

        catch (error) {

            console.log(
                "================================"
            );

            console.log(
                "EDIT CONTENT ERROR:"
            );

            console.log(
                error
            );

            console.log(
                "================================"
            );


            // =================================================
            // INVALID MONGODB ID
            // =================================================

            if (
                error.name ===
                "CastError"
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid content ID"

                });
            }


            // =================================================
            // VALIDATION ERROR
            // =================================================

            if (
                error.name ===
                "ValidationError"
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        error.message

                });
            }


            // =================================================
            // SERVER ERROR
            // =================================================

            return res.status(500).json({

                success: false,

                message:
                    error.message

            });
        }
    }
);


// =====================================================
// EXPORT
// =====================================================

module.exports = createMovie;