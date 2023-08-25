const exp = require("constants");
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
require("./db/connectDb.js")
const hbs = require("hbs");
const User = require("./models/usermessage.js")


const staticPath = path.join(__dirname,"../public");
const viewspath = path.join(__dirname,"../templates/views");
const partialpath = path.join(__dirname,"../templates/partials");

hbs.registerPartials(partialpath);

// app.use(express.static(staticPath));
app.use("/css",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use("/js",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use("/jq",express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.set('view engine','hbs');
app.set("views",viewspath);
app.use(express.urlencoded({extended:false}))

// routing
app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/work",(req,res)=>{
    res.render("portfolio");
})

app.post("/contact", async (req,res)=>
{
    try
    {
        // res.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("home");
    }
    catch(error)
    {
        res.status(500).send(error);
    }
})

// listening server
app.listen(port,"localhost",()=>
{
    console.log(`The server is running on port ${port}.`); 
});
