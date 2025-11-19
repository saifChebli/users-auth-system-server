import User from "../models/User.js"
import validator from 'validator'
import bcrypt from 'bcrypt'


// Admin : Get all users


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


// update user profile

export const updateProfile = async (req,res) => {

    const { name , email } = req.body
    
    try {
        // const user = await User.findById(req.user.id)
        // if (!user) return res.status(404).json({message : "User not found"})
            
            if(email){
                if (!validator.isEmail(email)) return res.status(400).json({message : "Invalid email"})   
                }     
        const update = { name , email }
        
        if(req.file){
            update.photo = `/uploads/profile/${req.file.filename}`
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id , update).select("-password")
        res.status(200).json({message : "Profile updated" , updatedUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Internal server error"})
    }
}


export const changePassword = async (req , res) => {

    const {currentPassword , newPassword} = req.body

    if(!currentPassword || !newPassword) return res.status(400).json({message : "Missing Fields"})

    try {
        const user = await User.findById(req.user.id).select("+password")
        if (!user) return res.status(400).json({message : "User not found"})
            
        const match = await bcrypt.compare(currentPassword , user.password)

        if (!match) return res.status(401).json({message : "Current password incorrect"})

        user.password = await bcrypt.hash(newPassword , 10)

        await user.save()
        res.json({message : "Password updated"})
    } catch (error) {
         console.log(error)
        res.status(500).json({message : "Internal server error"})
    }
}