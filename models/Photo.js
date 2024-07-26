const mongoose = require("mongoose")
const Schema = mongoose.Schema

const photoSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    url: {
        type: String,
        trim: true,
        required: true
    },
    image_id: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Photo = mongoose.model("Photo", photoSchema)

module.exports = Photo