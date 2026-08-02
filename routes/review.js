const express= require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {reviewSchema}=require("../schema.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const{validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js");





//reviews
router.post("/",isLoggedIn,validateReview,wrapAsync(async(req,res)=>{
    const{id}=req.params;
    // console.log(req.user);
    let listing=await Listing.findById(req.params.id);
    const newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    listing.review.push(newReview);
    await newReview.save().then((res)=>{console.log(res);});
    await listing.save();
    console.log("-----New Review Saved-----");
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${id}`);
}));

//Delete Review Route
router.delete("/:ObjectId",isReviewAuthor,wrapAsync(async(req,res)=>{
    const{id,ObjectId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{review:ObjectId}});
    console.log("----Deleted review form listing but not from review db-----");
    await Review.findByIdAndDelete(ObjectId);
    console.log("----Deleted review form review db-----");
     req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}));



module.exports=router;