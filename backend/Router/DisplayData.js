const express = require("express");
const router = express.Router();
const orederdata=require("../model/Orders")

router.post("/foodData", (req, res) => {
    try {
        res.send([ global.food_item,global.foodCategory]); // Fixed typo in 'food_item'
    } catch (error) {
        console.error(error.message); // Corrected error logging
        res.status(500).send("Server error"); // Added status code for server error
    }
});

module.exports = router;
