import User from "../models/User.js";
import validator from "validator"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken.js";





// Create a new User

export const signUp = async (req,res) => {

    const { name , email , password } = req.body

    try {

        if (!name || !email) return res.status(400).json({message : "All fields are required"})
            
        // Validation 

        if(!validator.isEmail(email)) return res.status(400).json({message : "Not valid email !"})

        if(!validator.isLength(password , { min : 8 })) return res.status(400).json({message : "Password must be more than 7 digits !"})
        

        // check if user is exist
        const existUser = await User.findOne({email})
        if (existUser) return res.status(400).json({message : "Bad credentials !"})
        

        // hash password
        const hashedPassword = await bcrypt.hash(password , 10)
        

        const user = await User.create({name , email , password : hashedPassword})

        res.status(201).json({message : "Account created successfully" , user})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Internal server error"})
    }
}

// Login user

export const login = async (req,res) => {

    const {email , password} = req.body

    try {

        if (!email || !password) return res.status(400).json({message : "All fields are required !"})
        
        // validation 

        if (!validator.isEmail(email)) return res.status(400).json({message : "Not valid email !"})

        const user = await User.findOne({email}).select("+password") // include password since select : false
        
        if (!user) return res.status(401).json({message : "Invalid credentials"})

        const isMatch = await bcrypt.compare(password , user.password)

        if (!isMatch) return res.status(401).json({message : "Invalid credentials"})

        const token = generateToken({id : user._id , role : user.role})
        
        res.status(200).json({
            id : user._id,
            name : user.name,
            email : user.email,
            role : user.role,
            token
        })
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
}