const mongoose=require("mongoose");
const jobschema=new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    company:{
        type:String,
        required:true
    },
    skillsrequired:{
        type:[String],
        required:true
    },
    description:{
        type:String
    },
    status: {
    type: String,
    enum: ["open", "closed"],
    default: "open"
}


},
{timestamps:true

});

module.exports=mongoose.model("Jobs",jobschema);
