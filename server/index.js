const express = require("express")
const app = express()
app.use(express.json())
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const { connectDB } = require("./databases/database");

dotenv.config();


app.listen(process.env.PORT, () => {
    console.log("Backend Server is running !")
})
connectDB();