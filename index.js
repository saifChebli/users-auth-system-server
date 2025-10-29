import express from 'express'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'


const app = express()
const port = process.env.PORT

// middleware to parse json data
app.use(express.json())

// Connect to MongoDB
connectDB()

// Routes

app.use(userRoutes)

app.listen(port , () => {
    console.log(`Server is running on port : ${port}`)
})