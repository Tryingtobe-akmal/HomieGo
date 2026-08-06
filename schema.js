const joi=require("joi");

module.exports.listingSchema=joi.object({
    listing:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        location:joi.string().required(),
        country:joi.string().required(),
        price:joi.number().required().min(0),
        image:joi.string().allow("",null),
        category:joi.string().valid(
            "Trending",
            "Rooms",
            "IconiCities",
            "Mountains",
            "Camping",
            "Castles",
            "AmazingPools",
            "Farms",
            "Arctic",
            "Domes",
            "Island",
        ).required(),
    }).required()
});
 

module.exports.reviewSchema=joi.object({
    review:joi.object({
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required()
    }).required()
});

module.exports.bookingSchema=joi.object({
    booking:joi.object({
        checkedIn:joi.date().required(),
        checkedOut:joi.date()
                           .greater(joi.ref("checkedIn"))
                           .required()
                           .messages({"date.greater":"Check-out date must be greater than Check-in date"}),
        guests:joi.number()
                        .integer()
                        .min(1)
                        .required(),                

    }).required()
});