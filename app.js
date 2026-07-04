const express=require("express");
const app=express();
const mongoose = require('mongoose');
const Listing=require("../models/listing.js");

main().catch(err => console.log(err)).then(()=>{console.log("Connected to db")});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/HomieGo');
}

app.listen(8080,()=>{
    console.log("app is listening non port 8080");
});

app.get("/",(req,res)=>{
    res.send("Hi ,I am root");
});

// app.get("/testlistings",(req,res)=>{
//     let sampleListing=new Listing({
//         title:"My new villa",
//         description:"By the beach",
//         price:1200,
//         location:"Goa",
//         country:"India"
//     });
//      sampleListing.save().then((res)=>{
//         console.log(res);
//      })
//      .catch((err)=>{
//         console.log(err);
//      });

//     res.send("successful testing");
// });
