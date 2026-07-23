module.exports=(fn)=>{
    return function(req,res,next){
        fn(req,res,next).catch((err)=>{
            next(err);
      });
     }
    }
//since fn is na async function it returns a promise
//therefore .then() and .catch() is written