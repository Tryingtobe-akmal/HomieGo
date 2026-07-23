const express=require("express");
const app=express();
const mongoose = require('mongoose');
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const engine = require('ejs-mate');
app.use(express.static(path.join(__dirname,"public")));
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");


app.engine('ejs', engine);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));



main()
.then(()=>{console.log("Connected to db")})
.catch((err)=>{console.log(err);})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/HomieGo');
}

app.listen(8080,()=>{
    console.log("app is listening non port 8080");
});

const validateListing=(req,res,next)=>{
let {error}= listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
        
    }else{
        next();
    }
}

app.get("/",(req,res)=>{
    res.send("Hi ,I am Akmal");
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
app.get("/listings",wrapAsync(async(req,res)=>{
  const allListings=await Listing.find({});
  res.render("./listings/index.ejs",{allListings});
}));

//new route
app.get("/listings/new",(req,res)=>{
    res.render("./listings/form.ejs");
});

//show route
app.get("/listings/:id",wrapAsync(async(req,res)=>{
    const{id}=req.params;
    const clickedListing=await Listing.findById(id);
    res.render("./listings/show.ejs",{clickedListing})    
}));

//create route
app.post("/listings",validateListing,wrapAsync(async(req,res)=>{
    console.log(req.body);
    const newListing= await new Listing(req.body.listing);
    await newListing.save();//dont forget .save
    res.redirect("/listings");
}));

//edit route
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
     const{id}=req.params;
     const clickedListing=await Listing.findById(id);
    res.render("./listings/edit.ejs",{clickedListing});
}));
//update route
app.put("/listings/:id",validateListing,wrapAsync(async(req,res)=>{
     const{id}=req.params;
    //  if(!req.body.listing){
    //     throw new ExpressError(400,"send valid data for listing");
    // }
    console.log(req.body.listing);
    await Listing.findByIdAndUpdate(id,req.body.listing,{runValidators:true});
    res.redirect("/listings");
}));
//delete route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    const{id}=req.params;
     await Listing.findByIdAndDelete(id);
     res.redirect("/listings");
}));



app.use((req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});

app.use((err,req,res,next)=>{
    const{statuscode=500,message="something went wrong"}=err;
    res.render("./listings/error.ejs",{err});
    // res.status(statuscode).send(message);
});