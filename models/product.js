const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000,
            trim: true   
        },
        price: {
            type: Number,
            required: true,
            maxlength: 32,
            trim: true
        },
    },
    
{ timestamps: true});

module.exports = mongoose.model("Product", productSchema);