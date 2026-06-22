const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Save Order
router.post("/", async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();

        res.status(201).json({
            success: true,
            message: "Order Saved"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// Get All Orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();

        res.json(orders);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;