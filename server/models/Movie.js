const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String },
        img: {type: String },
        bigImg: {type: String },
        titleImg: {type: String },
        trailer: { type: String },
        video: { type: String },
        year: { type: Number, },
        limit: { type: Number, },
        genre: { type: String, },
        isSeries: { type: Boolean, default: false }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Movie", MovieSchema);