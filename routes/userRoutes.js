import express from 'express'
import { changePassword, getProfile, updateProfile } from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js'


const router = express.Router()


// Private Routes

router.get("/me" , protect , getProfile)
router.put("/update-me" , protect , updateProfile)
router.put("/change-password" , protect , changePassword)






export default router