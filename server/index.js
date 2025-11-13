import express from 'express'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { seedAdmin } from './initAdmin.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT

// middleware to parse json data
app.use(express.json())
app.use(cors())
// Connect to MongoDB
connectDB()

// Routes

// app.use(userRoutes)

app.use("/api/auth" , authRoutes)
app.use("/api/users" , userRoutes)

app.listen(port , () => {
    console.log(`Server is running on port : ${port}`)
})