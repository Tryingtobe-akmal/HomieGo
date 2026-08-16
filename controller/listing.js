const Listing=require("../models/listing.js");
const User=require("../models/user.js");
const { listingSchema } = require("../schema.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index=async(req,res)=>{
    const{category,search}=req.query;
    if(category){
      const allListings=await Listing.find({category:category});
      res.render("./listings/index.ejs",{allListings});
    }
    else if(search){
        const allListings=await Listing.find({
            $or:[
                {title:{$regex:search,$options:"i"}},
                {location:{$regex:search,$options:"i"}},
                {country:{$regex:search,$options:"i"}},
            ]
        });
        if(allListings && allListings.length){
            res.render("./listings/index.ejs",{allListings});
        }else{
            res.render("./listings/noSearchedResults.ejs",{search});
        }
       
    }else{
         const allListings=await Listing.find({});
        res.render("./listings/index.ejs",{allListings});
    }  }
 

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
    const response=await geocodingClient.forwardGeocode({
        query:req.body.listing.location,
        limit: 1
    })
    .send()
    // console.log(response.body.features[0].geometry);

    const newListing= await new Listing(req.body.listing);
    newListing.owner=req.user._id;//imp
    newListing.geometry=response.body.features[0].geometry;
    newListing.image.url=req.file.path;
    newListing.image.filename=req.file.filename;
    await newListing.save();//dont forget .save
    console.log(newListing);
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
}
module.exports.renderEditForm=async(req,res)=>{
     const{id}=req.params;
     const clickedListing=await Listing.findById(id);
     if(!clickedListing){
        req.flash("error","Listing You requested for does not exist!");
        return res.redirect("/listings");
     }
     let originalImageUrl=clickedListing.image.url;
     
     originalImageUrl=originalImageUrl.replace("/upload","/upload/h_250");

    res.render("./listings/edit.ejs",{clickedListing,originalImageUrl});
}
module.exports.updateListing=async(req,res)=>{
     const{id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,req.body.listing,{runValidators:true});

    const response=await geocodingClient.forwardGeocode({
        query:req.body.listing.location,
        limit: 1
    })
    .send()

     listing.geometry=response.body.features[0].geometry;

    if(typeof(req.file)!=="undefined"){

        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};

    }
    await listing.save();
    console.log(listing);
     req.flash("success","Listing Updated!"); 
     res.redirect(`/listings/${id}`);
}
module.exports.destroyListing=async(req,res)=>{
    const{id}=req.params;
     await Listing.findByIdAndDelete(id);
     req.flash("success","Listing Deleted!");
     res.redirect("/listings");
}
module.exports.addToWishlist=async(req,res)=>{
    const{id}=req.params;
    const user=await User.findById(req.user._id);
    if(!user.wishlist.includes(id)){
        user.wishlist.push(id);
        await user.save();
        console.log(`Listing id-${id} is added in Wishlist of ${user.username}`);
    }else{
        user.wishlist.pull(id);
        await user.save();
         console.log(`listing id-${id} is removed in Wishlist of ${user.username}`);
    }
    res.redirect(`/listings`);
}
module.exports.showAllWishlistedListings=async(req,res)=>{
    let user=await User.findById(req.user._id)
                        .populate("wishlist");
    // console.log(user);                   
    res.render("./listings/myWishlist.ejs",{listings:user.wishlist});
}
