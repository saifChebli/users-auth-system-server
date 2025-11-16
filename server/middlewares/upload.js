import multer from 'multer'
import path from "path"


const storage = multer.diskStorage({
    destination: "uploads/profile",
    filename : (req , file , cb) => {
        const uniqueExt = path.extname(file.originalname)
        cb(null , `user-${Date.now()}${uniqueExt}`)
    }
})


export const upload = multer({ storage })