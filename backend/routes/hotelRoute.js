import { Router } from "express";
import { addHotel, getAllHotels, getHotelByLocation } from "../controllers/HotelController.js";

const hotel = Router();


hotel.get('/hotel',getAllHotels);

hotel.get('/hotels/:city',getHotelByLocation);

hotel.post('/hotel',addHotel);

export default hotel;