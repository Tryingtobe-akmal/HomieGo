const User=require("../models/user.js");

module.exports.signup=async(req,res)=>{
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
}

module.exports.renderSignupForm=(req,res)=>{
    res.render("./users/signup.ejs");
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("./users/login.ejs");
}
module.exports.login=async(req,res)=>{
    console.log(req.user);
    req.flash("success","Welcome to HomieGo,You are Logged in!");
    let redirectUrl=res.locals.redirectUrl||"/listings";
    console.log(redirectUrl);
    res.redirect(redirectUrl);
}
module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }else{
        req.flash("success","You are Logged out!");
        res.redirect("/listings");
        }
    });
}