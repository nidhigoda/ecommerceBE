const userService=require('../services/user.service.js') 


const getUserProfile=async(req,res)=>{
    try{
        console.log("Token", req.rawHeaders[7])
        const jwt=req.rawHeaders[7]?.split(" ")[1];

        if(!jwt){
            return res.status(404).send({error:"token not found"})
        }

        const user=await userService.getUserProfileByToken(jwt)
        return res.status(200).send(user);
    }
    catch(error){
        return res.status(500).send({error:error.message})
    }
}

const getAllUsers=async(req,res)=>{
    try{
        const users=await userService.getAllUsers();
        return res.status(200).send(users)
    }
    catch(error){
        return res.status(500).send({error:error.message})
    }
}

module.exports={getAllUsers,getUserProfile}