const mongoose=require("mongoose");
const main=async()=>{
    try{
        await mongoose.connect("mongodb+srv://admin:5.q_9BrEWEV9ZTX@cluster0.hr7fx.mongodb.net/job-alert?retryWrites=true&w=majority");

        console.log("mongodb has been connected");
    }
    catch(error){
        console.log("error has been detected",error);
        process.exit(1);
    }
};
module.exports =main;