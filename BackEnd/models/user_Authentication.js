
const mongoose = require('mongoose')


const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }

    }, { timestamps: true }
);

userSchema.index({ email: 1, userName: 1 }, { unique: true });

const userModel = mongoose.model("User", userSchema)


module.exports = userModel