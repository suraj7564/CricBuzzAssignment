const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const planSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true
        },
        products: [
            {
                type: ObjectId,
                ref: "Product"
            }
        ],
        price: {
            type: Number,
            required: true,
            maxlength: 32,
            trim: true
        },
        discount: {
            type: Number,
            required: true,
            maxlength: 32,
            trim: true
        }
    },
    
{ timestamps: true});

module.exports = mongoose.model("Plan", planSchema);