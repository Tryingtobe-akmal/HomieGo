const express= require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const User=require("../models/user.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js")

router.get("/signup",(req,res)=>{
    res.render("./users/signup.ejs");
});
router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        let{username,email,password}=req.body;
        const newUser=new User({
        email:email,
        username:username,
    });
        let registerUser= await User.register(newUser,password);//imp

        req.login(registerUser,(err)=>{
            if(err){
                next(err);
            }else{
                    req.flash("success","Welcome to HomieGo!");
                    res.redirect("/listings");
            }
        });
      
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
}));

router.get("/login",(req,res)=>{
    res.render("./users/login.ejs");
});


router.post("/login",saveRedirectUrl,passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
}),async(req,res)=>{
    req.flash("success","Welcome to HomieGo,You are Logged in!");
    let redirectUrl=res.locals.redirectUrl||"/listings"
    res.redirect(redirectUrl);
});


router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }else{
        req.flash("success","You are Logged out!");
        res.redirect("/listings");
        }
    });

})

module.exports=router;