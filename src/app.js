const express=require("express");
const app=express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("server is running");
});

const userRoutes = require("./routes/routes");

app.use(userRoutes);
module.exports=app;