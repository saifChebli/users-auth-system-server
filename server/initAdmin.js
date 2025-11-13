import User from "./models/User.js"
import bcrypt from 'bcrypt'



export const seedAdmin = async () => {
    try{
        const adminExist = await User.findOne({role: "admin"})
        if (adminExist){
            console.log('Admin exist !')
            process.exit()
        }
        const hashedPassword = await bcrypt.hash('supersecret123' , 10)

        const adminUser = await User.create({name : "Admin" , email :"adminone@yopmail.com" , password:hashedPassword , role:"admin"})
        console.log(adminUser)
    }catch (error){
        console.log(error)
    }
}