import User from "../models/User.js";




// Get all users

export const getUsers = async (req,res) => {

    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message : error.message})
    }

}


// Create a new User

export const signUp = async (req,res) => {

    const { name , email , age } = req.body

    try {
        // check if user is exist
        const existUser = await User.findOne({email})
        if (existUser) return res.status(400).json({message : "Bad credentials !"})
        
        const user = await User.create({name , email , age})

        res.status(201).json({message : "Account created successfully" , user})
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
}