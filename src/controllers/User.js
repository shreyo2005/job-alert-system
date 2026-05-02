const User = require("../models/user");

//creation of a user
const createuser=async(req,res)=>{
    try{
        const{name,skills,role}=req.body;

        const user=new User({
            name,
            skills,
            role
        });

        await user.save();
        res.status(201).json({
            message:"user has been created sucessfully",
            data:user
        });
    }catch(error){
        res.status(500).json({
            message:"error creating user",
            data:error.message
        });
    }
};
//getting all the users 
const getusers=async(req,res)=>{
    try{
        const users=await User.find();


        res.status(200).json({
            count:users.length,
            data:users
        });

        


    }catch(error){
        res.status(500).json({
            message:"error creating a user",
            data:error.message
        })
    }
};

//getting all the users by id


const getuserbyid=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({
                message:"user has not been found"
            })
        }
        res.status(200).json(user);
    }

    catch(error){
        res.status(500).json({
            message:"error fetching the user",
            error:error.message
        });
    }
};

//deleting the user
const deleteuser=async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id);

        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        res.status(200).json({
            message:"user deleted"
        })

        
    }catch(error){
        res.status(500).json({
            message:"error deleting user",
            error:error.message,
        })
    }
};
module.exports={
    createuser,
    getusers,
    getuserbyid,
    deleteuser

};