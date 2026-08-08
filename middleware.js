const Listing=require("./models/listing.js");
const ExpressError=require("./utils/ExpressError.js");
const {reviewSchema,listingSchema,bookingSchema}=require("./schema.js");
const Review=require("./models/review.js");



module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in to created new Listing!");
        return res.redirect("/login");
    }else{
    next();
    }
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
       res.locals.redirectUrl= req.session.redirectUrl;
       console.log(res.locals.redirectUrl);
    }
     next();
}

module.exports.isOwner=async(req,res,next)=>{
    const{id}=req.params;
    let Lis=await Listing.findById(id);
    if(!(Lis.owner.equals(res.locals.currUser._id))){
        req.flash("error","You are not the owner of this listing!");
       return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.validateListing=(req,res,next)=>{
let {error}= listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);   
    }else{
        next();
    }
}


module.exports.validateReview=(req,res,next)=>{
let {error}= reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);   
    }else{
        next();
    }
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    const{id,ObjectId}=req.params;
    let rev=await Review.findById(ObjectId);
    // console.log(rev);
    // console.log(req.user);
    if(!(rev.author.equals(req.user._id))){
        req.flash("error","You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

//why owner is booking its own house!
module.exports.ownBooking=async(req,res,next)=>{
    const{id}=req.params;
    let listing=await Listing.findById(id);
   if(req.user._id.equals(listing.owner._id)){
       req.flash("error","Owner cannot be the resider!");
       res.redirect(`/listings/${id}`);
   }else{
    console.log("Not booking you own residence --middleware executed----");
     return next();
   }
}

module.exports.validateBooking=(req,res,next)=>{
    console.log(req.body);
let {error}= bookingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);   
    }else{
        next();
    }
}



