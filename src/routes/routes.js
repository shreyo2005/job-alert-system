const express=require("express");
const router=express.Router();

const {
    createuser,
    getuserbyid,
    getusers,
    //deleteuser
}=require("../controllers/User.js");

router.post("/user",createuser);
router.get("/users",getusers);
router.get("/user/:id",getuserbyid);

router.delete("/user/:id",getuserbyid);


//routes for the jobs


module.exports=router;
