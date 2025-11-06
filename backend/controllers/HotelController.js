import Hotel from "../models/Hotel.js";

 

export const getHotelByLocation = async(req,res)=>{
     
    const { city } = req.params;
    try {
        const hotels = await Hotel.find({ "address.city": city });
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
 
export const getAllHotels = async (req, res) => {
  try {
    console.log("Before DB call");
    const hotels = await Hotel.find();
    console.log("After DB call", hotels);
    res.status(200).json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ message: error.message });
  }
};
// export const createGuest= async(req,res)=>{
//   const 
// }
export const addHotel= async(req,res)=>{
    const newHotel= await Hotel.create(req.body);
    try{
        return res.status(201).json({message: "Hotel added successfully", hotelId: newHotel._id});
    }
    catch(error){
        return res.status(500).json({message: "Server error"});
    }
}
