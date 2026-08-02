const Review=require("../models/review.js");
const Listing=require("../models/listing.js");

module.exports.createReview=async(req,res)=>{
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
}
module.exports.destroyReview=async(req,res)=>{
    const{id,ObjectId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{review:ObjectId}});
    console.log("----Deleted review form listing but not from review db-----");
    await Review.findByIdAndDelete(ObjectId);
    console.log("----Deleted review form review db-----");
     req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}