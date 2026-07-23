const mongoose=require("mongoose");
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
        
    }
});
const Listing=mongoose.model("Listing",listingSchema);//our model name : Listing
module.exports=Listing;