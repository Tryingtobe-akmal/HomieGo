const express= require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,ownBooking,validateBooking}=require("../middleware.js");

const bookingController=require("../controller/booking.js");

router.get("/listings/:id/book",isLoggedIn,ownBooking,wrapAsync(bookingController.renderBookingForm));
router.post("/listings/:id/book",isLoggedIn,validateBooking,wrapAsync(bookingController.reserveSeat));
router.get("/yourBookings",isLoggedIn,wrapAsync(bookingController.renderAllBookings));

module.exports=router;