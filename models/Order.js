const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    product: String,
    size: Number,
    quantity: Number,
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", orderSchema);