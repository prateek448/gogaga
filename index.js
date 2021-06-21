const database = require("./database");
const express=require("express")
const app=express()
const {
    ObjectId
  } = require('mongodb');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(express.static("public"));
app.set("view engine", "ejs");
database.connect(function(error){
    if(error)
    {
        console.log("error")
    }

app.get("/", (req,res)=>{
    res.render("first.ejs")
})
app.post("/", async (req,res)=>{
    name = req.body.name;
    location = req.body.location;
   rest= await database.getusers().find({name:name,location:location}).toArray()
    console.log(rest.length)
   if(rest.length===0){
    result = await database.getusers().insertOne({
        name: name,
        location: location
    })}
    
    res.redirect("/details")
})
app.get("/details",async (req,res)=>{
    details=await database.getusers().find({}).toArray()
    
    res.render("details.ejs",{
        users:details
    })
})

app.listen(process.env.PORT || 3000, function(){
    console.log("server connected to 3000 port")
});
});