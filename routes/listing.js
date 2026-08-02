const express= require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");



//index route
router.get("/",wrapAsync(async(req,res)=>{
  const allListings=await Listing.find({});
  res.render("./listings/index.ejs",{allListings});
}));

//new route
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("./listings/form.ejs");
});

//show route
router.get("/:id",wrapAsync(async(req,res)=>{
    const{id}=req.params;
    const clickedListing=await Listing.findById(id)
    .populate({
        path:"review",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if(!clickedListing){
        req.flash("error","Listing you Requested for Does not exist!");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs",{clickedListing})    
}));

//create route
router.post("/",isLoggedIn,validateListing,wrapAsync(async(req,res)=>{
    console.log(req.body);
    const newListing= await new Listing(req.body.listing);
    newListing.owner=req.user._id;//imp
    await newListing.save();//dont forget .save
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
}));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
     const{id}=req.params;
     const clickedListing=await Listing.findById(id);
    res.render("./listings/edit.ejs",{clickedListing});
}));
//update route
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(async(req,res)=>{
     const{id}=req.params;
    console.log(req.body.listing);
    await Listing.findByIdAndUpdate(id,req.body.listing,{runValidators:true});
     req.flash("success","Listing Updated!"); 
     res.redirect(`/listings/${id}`);
}));
//delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    const{id}=req.params;
     await Listing.findByIdAndDelete(id);
     req.flash("success","Listing Deleted!");
     res.redirect("/listings");
}));


module.exports=router;