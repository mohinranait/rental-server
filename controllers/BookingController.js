const Booking = require("../models/BookingModel");

const newBookingMethod = async (req, res) => {
    const body = req.body;

    const userId = req.query?.userId;
    const tokenId = req.user?.id;
    if(userId !== tokenId){
        return res.send({
            message: "forbidden access"
        })
    }

    try {
        const booking= await Booking.create(body);
        res.send({
            success:true,
            message:"Created"
        })
    } catch (error) {
        res.send({
            success:false,
            message: error.message
        })
    }
}


module.exports = {
    newBookingMethod,
}