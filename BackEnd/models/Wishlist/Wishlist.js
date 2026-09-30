
const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

  
    contentType: {
      type: String,
      enum: ["movie", "webseries", "anime"],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    year: {
      type: Number,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


wishlistSchema.index(
  {
    userId: 1,
    contentId: 1,
    contentType: 1,
  },
  {
    unique: true,
  }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;