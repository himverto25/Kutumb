const mongoose = require("mongoose");

// creating a database
mongoose.connect("mongodb://127.0.0.1:27017/enquiryform")
.then(()=>
{
    console.log("Connection to Database established successful.");
})
.catch((error)=>    
{
    console.log("ERROR connecting to database");
});