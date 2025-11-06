import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
//   price: { type: Number, required: true }
// });

// const Booking = mongoose.model("Booking", bookingSchema);

// export default Booking;


const bookingSchema= new mongoose.Schema({
userId:{ type:mongoose.Schema.Types.ObjectId, ref:"User", required:true },
hotelId:{ type:mongoose.Schema.Types.ObjectId, ref:"Hotel", required:true },
guests:[{type:mongoose.Schema.Types.ObjectId, ref:"GuestSchema"}], //array of guest schema ids
bookingType:{
  type:String,
  enum:["online","walk-in"],
  default:"online"
},
bookedBy:{ type:String, required:true }, //assign the roles of the person
startDate:{ type:Date, required:true },
endDate:{ type:Date, required:true },
price:{ type:Number, required:true }
} )

const Booking=mongoose.model("Booking", bookingSchema);
export default Booking;
