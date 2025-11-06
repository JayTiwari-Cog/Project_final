import express from "express";
import GuestSchema from "../models/GuestSchema.js";
import Hotel from "../models/Hotel.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import hotel from "../routes/hotelRoute.js";

export const createGuest = async(req,res)=>{
        const Guest=req.body;
    try{
        const guestDetails= await GuestSchema.create({
          fullName: Guest.fullName,
            email: Guest.email,
            country: Guest.country,
            phone: Guest.phone
        });
        return res.status(201).json({message: "Guest details added successfully", guestId: guestDetails._id});

    }

    catch(error){
        return res.status(500).json({message: "Server error"});
    }

}

export const createBooking= async(req,res)=>{
    console.log("Inside createBooking");
    const {email,hotelName,fullName,startDate,endDate}=req.body;

    try{
        if(!email || !hotelName || !fullName || !startDate || !endDate){
            return res.status(400).json({message: "All fields are required"});
        }
        let bookingtype;
        const userId = await User.findOne({ email: email });
        console.log(userId);
        const hotelId = await Hotel.findOne({ hotelName: hotelName });
        console.log(hotelId);
        const guestId = await GuestSchema.findOne({ firstName: firstName });
        console.log(guestId);
        
        if(userId.role== 'user'){
            bookingtype='online';
        }
        else if(userId.role=='manager'){
            bookingtype='walk-in';
        }
         console.log(bookingtype);
        const newBooking = await Booking.create({
            userId: userId._id,
            hotelId: hotelId._id,
            guests: guestId._id,
            bookingType: bookingtype,
            bookedBy: userId.role,
            startDate,
            endDate,
            price: hotelId.pricePerNight
        });

        return res.status(201).json({message: "Booking created successfully", bookingId: newBooking._id});
    }

    catch(error){
        return res.status(500).json({message: "Server error"});
    }
}

export const getBookings= async(req,res)=>{

 const returnbookings = await Booking.find().populate('userId').populate('hotelId').populate('guests');

 res.status(200).json({bookings: returnbookings});
       
    }
