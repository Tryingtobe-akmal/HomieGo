const mongoose=require("mongoose");
const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:String,
    image:{
        type:String,
        default:"https://unsplash.com/photos/white-bed-linen-with-throw-pillows-Yrxr3bsPdS0",
        set:(v)=>{ return v===""? "https://unsplash.com/photos/white-bed-linen-with-throw-pillows-Yrxr3bsPdS0":v} ,// read mongoose virtual
    },
    price:Number,

    location:String,

    country:String,
});
const Listing=mongoose.model("Listing",listingSchema);//our listing model
module.exports=Listing;