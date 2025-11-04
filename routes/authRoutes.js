import express from 'express'
import { login, signUp } from '../controllers/authController.js'



const router = express.Router()



// Public Routes
router.post("/sign-up" , signUp)
router.post("/login" , login)


export default router