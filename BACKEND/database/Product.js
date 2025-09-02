
const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    tags: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("Product", ProductSchema)