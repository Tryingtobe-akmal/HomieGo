const express=require("express");
const app=express();
const mongoose = require('mongoose');
const path=require("path");
const methodOverride=require("method-override");
const engine = require('ejs-mate');
const ExpressError=require("./utils/ExpressError.js");



const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");


app.engine('ejs', engine);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));


main()
.then(()=>{console.log("Connected to db")})
.catch((err)=>{console.log(err);})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/HomieGo');
}

app.listen(8080,()=>{
    console.log("app is listening non port 8080");
});

app.get("/",(req,res)=>{
    res.send("Hi ,I am Akmal");
});



//routes
app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);




//middlewares
app.use((req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});

app.use((err,req,res,next)=>{
    const{statuscode=500,message="something went wrong"}=err;
    res.render("./listings/error.ejs",{err});
    // res.status(statuscode).send(message);
});