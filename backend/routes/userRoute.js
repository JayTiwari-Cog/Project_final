import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import passport from "../config/passport_Config.js"
import jwt from "jsonwebtoken";
const router = Router();


router.post("/login", loginUser);
router.post("/register", registerUser);
router.get('/verify', (req, res) => {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];


 if (!token) {
   return res.status(401).json({ success: false, message: 'No token provided' });
 }
 try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ success: true, message: 'Token is valid', userId: decoded.id });
 } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token', error: error.message });
 }
})

export default router;
