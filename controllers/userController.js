import User from "../models/User.js"



// Get all users


export const getUsers = async (req,res) => {

    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message : error.message})
    }

}

// Get one user by ID

export const getUserById = async (req,res) => {
    const userId = req.params.id

    try {
        const user = await User.findById(userId)
        if (!user) return res.status(404).json({message : "User not found"})
        
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Internal server error"})
    }

}




export const getProfile = async (req,res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) return res.status(404).json({message : "User not found"})
        
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Internal server error"})
    }
}