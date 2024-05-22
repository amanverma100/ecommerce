const userModel=require('../model/userModel');
const updateuser=async(req,res)=>
    {         const {email,Uid,Name,role}=req.body
              const payload={
               ...(email&&{email:email}),
                ...(Name&&{Name:Name}),
                ...(role&&{role:role}),
              }
              //from middleware
            const id=req.user.Id;
            const pass=req.user.password;
           //find data from for crosscheck updater password database   
        try{
             const data=await userModel.findById(id);
             if(data.password===pass)
                {
                await userModel.findByIdAndUpdate(Uid,payload);
                res.status(200).json({message:"user updated successfuuly",success:true,error:false});
                }
                else
                {
                    return res.status(412).json({message:"condition not met", success:false,error:true})
                }
            
    }
        catch(error)
        {
              res.status(500).json({message:"unable to update now",success:false,error:true});
        }
    }
   module.exports=updateuser;