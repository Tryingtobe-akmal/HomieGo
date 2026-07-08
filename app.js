const express=require("express");
const app=express();
const mongoose = require('mongoose');
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const engine = require('ejs-mate');
app.use(express.static(path.join(__dirname,"public")));

app.engine('ejs', engine);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));



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


//index route
app.get("/listings",async(req,res)=>{
  const allListings=await Listing.find({});
  res.render("./listings/index.ejs",{allListings});
});
//new route
app.get("/listings/new",(req,res)=>{
    res.render("./listings/form.ejs");
});
//show route
app.get("/listings/:id",async(req,res)=>{
    const{id}=req.params;
    const clickedListing=await Listing.findById(id);
    res.render("./listings/show.ejs",{clickedListing})    
});
//create route
app.post("/listings",async(req,res)=>{
    console.log(req.body.listing);
    const newListing= await new Listing(req.body.listing).save();//dont forget .save
    res.redirect("/listings");
});

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
     const{id}=req.params;
     const clickedListing=await Listing.findById(id);
    res.render("./listings/edit.ejs",{clickedListing});
});

app.put("/listings/:id",async(req,res)=>{
     const{id}=req.params;
    console.log(req.body.listing);
    await Listing.findByIdAndUpdate(id,req.body.listing);
    res.redirect("/listings");
})

app.delete("/listings/:id",async(req,res)=>{
    const{id}=req.params;
     await Listing.findByIdAndDelete(id);
     res.redirect("/listings");
});