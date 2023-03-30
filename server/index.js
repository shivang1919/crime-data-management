const express = require("express")
const app = express()
app.use(express.json())
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const { connectDB } = require("./databases/database");
const userRoutes = require("./routes/userRoutes")
const policeRoutes = require("./routes/policeRoutes")
dotenv.config();
app.use('/api/police',policeRoutes)
app.use('/api/users',userRoutes)

app.listen(process.env.PORT, () => {
    console.log("Backend Server is running !")
})
connectDB();