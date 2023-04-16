const express = require("express")
const app = express()
app.use(express.json())
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const { connectDB } = require("./databases/database");
const  cors = require("cors")
const userRoutes = require("./routes/userRoutes")
const policeRoutes = require("./routes/policeRoutes")
dotenv.config();
app.use(cors({
    "origin": ["http://localhost:3000", 'https://crime-data-management.vercel.app','https://crime-data-management-api.vercel.app'],
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
}))
app.use('/api/police',policeRoutes)
app.use('/api/users',userRoutes)


app.listen(process.env.PORT, () => {
    console.log("Backend Server is running !")
})
connectDB();