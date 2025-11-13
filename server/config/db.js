import mongoose from "mongoose";


const connectDB = async () => {

    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DATABASE Connected : ${connect.connection.host}`)
    } catch (error) {
        console.log(error)
    }

}

// mongoose.connect() : establishes a connection to MongoDB


export default connectDB