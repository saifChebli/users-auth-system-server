import express from 'express'
import { getUsers, signUp } from '../controllers/userController.js'



const router = express.Router()



router.get("/get-users" , getUsers)
router.post("/sign-up" , signUp)





export default router