import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true }
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
