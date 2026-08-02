const mongoose=require("mongoose");
const Review=require("./review.js");
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
    }
});
//post middleware
listingSchema.post("findOneAndDelete",async(listing)=>{
    console.log("---middleware executed----");
    if(listing){
        await Review.deleteMany({_id:{$in:listing.review}});
    }
    // await Review.deleteMany({review:{$in:listing.review}});
    console.log("All reviews of listing deleted form review db after listing deletion, using post middle ware");
});

const Listing=mongoose.model("Listing",listingSchema);//our model name : Listing
module.exports=Listing;