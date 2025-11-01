import User from "../models/User.js";
import UserCreds from "../models/UserCreds.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const registerUser = async (req, res) => {
    const {name,email,phoneNumber,password,confirmPassword} = req.body;
    try{
        if(password !== confirmPassword){
            return  res.status(400).json({message: "Passwords do not match"});
        }

        if(!name || !email || !phoneNumber || !password){
            console.log(name,email,phoneNumber,password);
            return res.status(400).json({message: "All fields are required"});
        }
         const pattern=/^[a-zA-Z0-9._%+-]+@company\.com$/;
         const managerEmail = pattern.test(email);

         const existingUser= await User.findOne({
            $or: [{email}, {phoneNumber}]
         });

         if(existingUser){
            return res.status(400).json({message: "User with given email or phone number already exists"});
         }

         const user= await User.create({
            name,
            email,
            phoneNumber,
            role: managerEmail ? 'manager' : 'user'
         });
        const userCreds= await UserCreds.create({
            email,
            password:bcrypt.hashSync(password,10)
         });
        
         return res.status(201).json({message: "User registered successfully", userId: user._id});
    }
    catch(error){
        return res.status(500).json({message: "Server error"});
    }

}
export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const userDetails= await User.findOne({
            email:email
        });
        const user= await UserCreds.findOne({
            email:email
        });
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        }
        const isPasswordValid= bcrypt.compareSync(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid email or password"});
        }
        const token= jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
       
 return res.status(200).json({
  token: token,
  role: userDetails.role,  
   
  });

    }
    catch(error){
        return res.status(500).json({message: "Server error"});
    }
}