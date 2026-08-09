const mongoose=require("mongoose");
const Review=require("./review.js");
const Booking=require("./booking.js");
const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        default:"https://unsplash.com/photos/white-bed-linen-with-throw-pillows-Yrxr3bsPdS0",
        set:(v) => v==="" ? "https://unsplash.com/photos/white-bed-linen-with-throw-pillows-Yrxr3bsPdS0": v // read mongoose virtual
    },
    price:{
        type:Number,
        required:true,
    },

    location:{
        type:String,
        required:true,
    },

    country:{
        type:String,
        required:true,
        
    },
    review:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review",
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    category:{
        type:String,
        enum:[
            "Trending",
            "Rooms",
            "IconiCities",
            "Mountains",
            "Camping",
            "Castles",
            "AmazingPools",
            "Farms",
            "Arctic",
            "Domes",
            "Island",
        ],
    }
});
//post middleware
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.review}});
    }
    // await Review.deleteMany({review:{$in:listing.review}});
    console.log("All reviews of listing deleted form review db after listing deletion, using post middle ware");
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Booking.deleteMany({
            listing:listing._id,
        });
    }
     console.log("All Bookings of listing deleted form booking db after listing deletion, using post middle ware");
});

const Listing=mongoose.model("Listing",listingSchema);//our model name : Listing
module.exports=Listing;