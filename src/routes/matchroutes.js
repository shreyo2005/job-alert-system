
const express=require("express");
const router=express.Router();
const {
    matchedjobs
}= require("../controllers/matchcontrollers");

router.get("/job/match/:userid",matchedjobs);

router.get("/test", (req, res) => {
    res.send("working");
});

module.exports=router;