const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const connectMongoDB = async () => {
    try {
        // Connect to MongoDB with options to avoid deprecation warnings (if any)
        await mongoose.connect(MONGO_URI, {
        });
        console.log("Connected to MongoDB");

        // Access the database and collections
        const db = mongoose.connection.db;
        const fetch_data = db.collection("food_iteam");
                                                                                             
        // Fetch data asynchronously and assign it to global variables
        const data = await fetch_data.find({}).toArray();
        if (data.length === 0) {
            console.log("No documents found in the food_iteam collection.");
        } else {
            global.food_item = data;
            console.log("Fetched food_iteam data successfully");
        }
        const fetch_category = db.collection("foodCategory");
        const categoryData = await fetch_category.find({}).toArray();
        global.foodCategory = categoryData;
        console.log("Fetched foodCategory data successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};
module.exports = connectMongoDB;