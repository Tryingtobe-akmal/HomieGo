if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}


const express=require("express");
const app=express();
const mongoose = require('mongoose');
const path=require("path");
const methodOverride=require("method-override");
const engine = require('ejs-mate');
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const MongoStore = require("connect-mongo").default;
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");



const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const bookingRouter=require("./routes/booking.js");


app.engine('ejs', engine);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));

const dbUrl = process.env.MONGODB_URI;


async function main() {
    try {
        await mongoose.connect(dbUrl);
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.log("❌ MongoDB connection failed");
        console.log(err);
    }
}


const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);

async function main() {
    try {
        await mongoose.connect(dbUrl);
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.log("❌ MongoDB connection failed");
        console.log(err);
    }
}

main();



app.listen(8080,()=>{
    console.log("app is listening non port 8080");
});

const store=MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret:process.env.SESSION_SECRET,
    },
    touchAfter:24*3600,
    });

store.on("error",()=>{
    console.log("Error in the mongo session store",error);
});
    
const sessionOptions={
    store,
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+ 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
    }
}


app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    // console.log(res.locals.success); --res.local.success is an array
    res.locals.currUser=req.user;
    //res.local can be accessed in ejs directly but  req.user cannot!
    next();
});



//globalsearch middleware
app.use((req,res,next)=>{
    if(req.method=="GET" &&
        req.query.search &&
        req.path !="/listings"
    ){
        return res.redirect(
            `/listings?search=${encodeURIComponent(req.query.search)}`
        );
    }
    next();
});
//routes
app.use("/listings",listingsRouter);
app.use("/",userRouter);
app.use("/",bookingRouter);
app.use("/listings/:id/review",reviewsRouter);





//middlewares
app.use((req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));//for no route match---
});

app.use((err,req,res,next)=>{
    console.error("FULL ERROR",err.stack)
    const{statuscode=500,message="something went wrong"}=err;
    res.render("./listings/error.ejs",{err});
    // res.status(statuscode).send(message);
});