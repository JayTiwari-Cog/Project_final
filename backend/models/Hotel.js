import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
    name: {
         type: String,
        required: true
         },
    location: {
         type: String,
          required: true
         },
    roomType: {
         type: String,
          required: true
         },
    amenities: {
         type: [String],
          required: false
         },
    address: {
         type: String,
          required: true
         },
    city: {
         type: String,
          required: true
         },
    pricePerNight: {
         type: Number,
          required: true
         },
}, { timestamps: true });

const Hotel = mongoose.model("Hotel", HotelSchema);
export default Hotel;
