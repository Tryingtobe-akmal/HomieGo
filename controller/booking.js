const Listing=require("../models/listing.js");
const Booking=require("../models/booking.js");

module.exports.renderBookingForm=async(req,res)=>{
   const{id}=req.params;
   let listing= await Listing.findById(id);
   //Finding all booking of particular listing for disabling dates in form 
   const bookings=await Booking.find({listing:id});
   console.log("-------The previous bookings of this lodge--------")
   console.log(bookings);
   res.render("./booking/form.ejs",{listing,bookings});
  
}
module.exports.reserveSeat=async (req,res) => {
    const{id}=req.params;
    let listing= await Listing.findById(id);
    const{checkedIn,checkedOut,price}=req.body.booking;
    //1.check dates checkout
    if(checkedOut<=checkedIn){
        console.log("wrong date");
        req.flash("error","Check-out date must be greater than Check-in date");
        return res.redirect(`/listings/${id}/book`);
    }
    //Check Existing Booking(important)
    const existingBooking=await Booking.findOne({
        listing:id,
        checkedIn:{$lte:checkedOut},
        checkedOut:{$gte:checkedIn},
    });

    if(existingBooking){
        req.flash("error","These dates are already Booked!");
        return res.redirect(`/listings/${id}/book`);
    }
    //price calculation after no existing booking
      let days=Math.ceil((new Date(checkedOut)-new Date(checkedIn))/(24*60*60*1000));
      let hotelprice=days*(listing.price);
      let totalHotelprice=hotelprice+(0.18*hotelprice);

        const newBooking=new Booking(req.body.booking);
        newBooking.listing=id;
        newBooking.user=req.user._id;
        newBooking.totalPrice=totalHotelprice;
   
    await newBooking.save();
    req.flash("success","Congratulation booking sucessfull!");
    res.redirect(`/listings/${id}`);

}
