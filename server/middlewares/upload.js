import multer from 'multer'
import path from "path"


const storage = multer.diskStorage({
    destination: "uploads/profile",
    filename : (req , file , cb) => {
        const uniqueExt = path.extname(file.originalname)
        cb(null , `user-${Date.now()}${uniqueExt}`)
    },
    limits : {
        fileSize : 5 * 1024 * 1024 // 5MB
    }
})


export const upload = multer({ storage })