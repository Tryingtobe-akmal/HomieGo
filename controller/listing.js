const Listing=require("../models/listing.js");

module.exports.index=async(req,res)=>{
  const allListings=await Listing.find({});
  res.render("./listings/index.ejs",{allListings});
}
module.exports.renderNewForm=(req,res)=>{
    res.render("./listings/form.ejs");
}
module.exports.showListing=async(req,res)=>{
    const{id}=req.params;
    const clickedListing=await Listing.findById(id)
    .populate({
        path:"review",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if(!clickedListing){
        req.flash("error","Listing you Requested for Does not exist!");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs",{clickedListing})    
}
module.exports.createListing=async(req,res)=>{
    console.log(req.body);
    const newListing= await new Listing(req.body.listing);
    newListing.owner=req.user._id;//imp
    await newListing.save();//dont forget .save
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
}
module.exports.renderEditForm=async(req,res)=>{
     const{id}=req.params;
     const clickedListing=await Listing.findById(id);
    res.render("./listings/edit.ejs",{clickedListing});
}
module.exports.updateListing=async(req,res)=>{
     const{id}=req.params;
    console.log(req.body.listing);
    await Listing.findByIdAndUpdate(id,req.body.listing,{runValidators:true});
     req.flash("success","Listing Updated!"); 
     res.redirect(`/listings/${id}`);
}
module.exports.destroyListing=async(req,res)=>{
    const{id}=req.params;
     await Listing.findByIdAndDelete(id);
     req.flash("success","Listing Deleted!");
     res.redirect("/listings");
}
