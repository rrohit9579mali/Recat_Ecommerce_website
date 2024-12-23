// server.js
const express = require("express");
const connectMongoDB = require("./db");
const app = express();
require("dotenv").config();
// Connect to MongoDB
connectMongoDB();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get("/",(req,res)=>{
  res.send("hellow world");
})
app.use(express.json());
 app.use("/api",require("./Router/Createuser"));
  app.use("/api",require("./Router/DisplayData"));
  app.use("/api",require("./Router/OrderDtat"));
app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
