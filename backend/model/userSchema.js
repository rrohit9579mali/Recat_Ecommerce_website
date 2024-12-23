const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    order_data: [
        {
            order_date: {
                type: Date,
                required: true
            },
            items: [
                {
                    name: String,
                    qty: Number,
                    size: String,
                    price: Number,
                    img: String
                }
            ]
        }
    ]
});

module.exports = mongoose.model("Order", orderSchema);
