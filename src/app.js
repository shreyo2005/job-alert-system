


const express=require("express");
const cors = require("cors");
const app=express();

app.use(cors());

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("server is running");
});

const userRoutes = require("./routes/routes");

app.use(userRoutes);


const jobRoutes = require("./routes/job");

app.use(jobRoutes);


const matchRoutes = require("./routes/matchroutes");
app.use(matchRoutes);


module.exports=app;            



