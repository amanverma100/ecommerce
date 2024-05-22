   const userModel=require('../model/userModel');
   const bcrypt=require('bcryptjs');
   const userSignin=async(req,res)=>
    {   
        const {email,password}=req.body;
        try{
             if(!email)
                {
                    throw new Error("please enter email");
                }
            if(!password)
                {
                    throw new Error("please enter password");
                }
            const user=  await userModel.findOne({email:email});
            if(user)
                {
              const result= await bcrypt.compare(password,user.password);
                 if(result)
                        {        
                              const token= await user.generateToken();
                            // const tokenoption={
                            //     secure:true,
                            //     httpOnly:true,
                            //     expires:new Date(Date.now()+60*60*1000*24)
    
                            // }
                            //return res.cookie("token",token,tokenoption).status(200).json({error:false,message:"login sucessfull",token:token});
                            res.status(200).json({error:false,message:"login sucessfull",token:token})
                         }
                    else
                        {
                         return res.status(401).json({error:true,message:"incorrect password"});
                         }
                        
                }
        else
        {
            return res.status(404).json({error:true,message:"user not registered"})
        }
        }
        catch(error)
        {
            res.status(500).json({ 
               error:true,
               message:error.message||"internal server error"
            })
        } 

    }
    module.exports=userSignin;