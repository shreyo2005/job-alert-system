const express=require("express");
const app=express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("server is running");
});

const userRoutes = require("./routes/routes");

app.use(userRoutes);


const jobRoutes = require("./routes/job");

app.use(jobRoutes);

module.exports=app;            



