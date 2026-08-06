const Listing=require("../models/listing.js");
const Booking=require("../models/booking.js");

module.exports.renderBookingForm=async(req,res)=>{
   const{id}=req.params;
   let listing= await Listing.findById(id);
   res.render("./booking/form.ejs",{listing});
}
module.exports.reserveSeat=async (req,res) => {
    const{id}=req.params;
    let listing= await Listing.findById(id);
    const{checkedIn,checkedOut,price}=req.body.booking;
    const newBooking=new Booking(req.body.booking);
    newBooking.listing=id;
    newBooking.user=req.user._id;
    const days=Math.ceil((new Date(checkedOut)-new Date(checkedIn))/(24*60*60*1000));
    let hotelprice=days*(listing.price);
    let totalHotelprice=hotelprice+(0.18*hotelprice);
    newBooking.totalPrice=totalHotelprice;
    await newBooking.save();
    req.flash("success","congratulation booking sucessfull");
    res.redirect(`/listings/${id}`);

}
