import express from 'express'
import { changePassword, getProfile, getUsers, updateProfile } from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { authorize } from '../middlewares/roleMiddleware.js'

const router = express.Router()


// Private Routes

router.get("/me" , protect , getProfile)
router.put("/update-me" , protect , updateProfile)
router.put("/change-password" , protect , changePassword)


// Admin endpoints

router.get("/" , protect , authorize("admin") , getUsers)



export default router