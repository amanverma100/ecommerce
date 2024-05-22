const userModel=require('../model/userModel');
const mongoose=require('mongoose');
const userVerified= async (req,res)=>
    {
      try{ 
           const id=req.user.Id;
           const password=req.user.password;
            // const objectId=mongoose.Types.ObjectId(id);
          const data= await userModel.findById(id);
          if(data.password===password)
            {
              res.json({message:data,sucess:true});
            }
       
      }
      catch(error)
      {
          res.json({message:"not able to fetch detail",error:true})
      }
    }
 module.exports=userVerified;