const express= require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

// const multer  = require("multer");
// const{storage}=require("../cloudConfig.js");
// const upload = multer({storage});

const listingController=require("../controller/listing.js");

router.get("/new",isLoggedIn,listingController.renderNewForm);

router
    .route("/")
        .get(wrapAsync(listingController.index))
        .post(isLoggedIn,validateListing,wrapAsync(listingController.createListing));
        // .post( upload.single('listing[title]'),(req,res)=>{res.send("Hi")});
        

router
    .route("/:id")
        .get(wrapAsync(listingController.showListing))
        .put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))
        .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

















module.exports=router;