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
   await Listing.insertMany(initdata);
   console.log("data inserted succesfully");
}
initDB()
.catch((err)=>{
  console.log(`dear the error is ${err}`);
})
console.log("hello");