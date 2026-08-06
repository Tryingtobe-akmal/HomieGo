const mongoose=require("mongoose");

const bookingSchema=new mongoose.Schema({
    listing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing",
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    checkedIn:{
        type:Date,
        required:true,
    },
    checkedOut:{
        type:Date,
        required:true,
    },
    guests:{
        type:Number,
        required:true,
    },
    
    totalPrice:{
        type:Number,
        required:true,
    }
},
    {
        timestamps:true,
    }
);


module.exports=mongoose.model("Booking",bookingSchema);