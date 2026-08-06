const express= require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing,ownBooking,validateBooking}=require("../middleware.js");

const bookingController=require("../controller/booking.js");

router.get("/book",isLoggedIn,ownBooking,wrapAsync(bookingController.renderBookingForm));
router.post("/",isLoggedIn,validateBooking,wrapAsync(bookingController.reserveSeat));

module.exports=router;