const mongoose = require('mongoose');
main()
.then(()=>{console.log("Connected to db")})
.catch(err => console.log(err))


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/HomieGo');
}
const Listing=require("../models/listing.js");//model ka name Listing hai with capital L
const initdata=require("./data.js");

const initDB=async()=>{
   await Listing.deleteMany({});
   console.log("data deleted succesfully");
   const initData=initdata.map((obj)=>({...obj,owner:'6a6e1d41039d246cc0143aa8'}));
   await Listing.insertMany(initData);
   console.log("data inserted succesfully");
}

initDB()
.catch((err)=>{
  console.log(`dear the error is ${err}`);
})
