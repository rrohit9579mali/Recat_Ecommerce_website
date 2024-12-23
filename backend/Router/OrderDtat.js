const express = require("express");
const router = express.Router();
const Order = require("../model/Orders"); // Use the correct path based on your project structure

// Handle new order data
router.post('/orderData', async (req, res) => {
   let data = req.body.Order_data;
   
   // Add the order date at the start of the order data
   data.splice(0, 0, { Order_date: new Date() });
   
   try {
       let eId = await Order.findOne({ email: req.body.email });   
       if (eId === null) {
           // Create a new order document if the email is not found
       await Order.create({
               email: req.body.email,
               Order_data: [data]
           });
           res.json({ success: true });
       } else {
           // Update the existing order data if the email is found
           await Order.findOneAndUpdate(
               { email: req.body.email },
               { $push: { Order_data: data } }
           );
           res.json({ success: true });
       }
   } catch (error) {
       console.log("Server error", error.message);
       res.send("Server Error: " + error.message);
   }
});
router.post('/myOrderData', async (req, res) => { // Changed to GET
    try {
          
        const orderData = await Order.findOne({ 'email':req.body.email});
        res.json({ orderData:orderData });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
module.exports = router;
