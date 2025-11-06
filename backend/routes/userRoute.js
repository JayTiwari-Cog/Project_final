import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
 
import passport from "../config/passport_Config.js"
import jwt from "jsonwebtoken";
import registrationSchema from "../validators/registrationValidator.js";
import loginSchema from "../validators/loginValidator.js";
import validateRegisteration from "../middleware/Validators.js";
import {createBooking, createGuest, getBookings } from "../controllers/GuestBooking.js";
import { getAllHotels, getHotelByLocation } from "../controllers/HotelController.js";
import { getBookingsForUser } from "../controllers/Feedback.js";
const router = Router();


// spread the schema arrays to register each validator function as middleware
router.post("/login", ...loginSchema, loginUser);
router.post("/register", validateRegisteration, registerUser);
router.get('/verify', (req, res) => {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];


 if (!token) {
   return res.status(401).json({ success: false, message: 'No token provided' });
 }
 try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ success: true, message: 'Token is valid', userId: decoded.userId });
 } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token', error: error.message });
 }
})

router.post('/guest',createGuest);
router.post('/test1',createBooking);
router.get('/test2',getBookings);
 

// router.get('/:city', getHotelByLocation)
// router.get('/hotel',getAllHotels);
router.get('/book/:userId', getBookingsForUser);

export default router;
