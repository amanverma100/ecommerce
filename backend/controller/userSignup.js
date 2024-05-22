const userModel=require('../model/userModel');
 const userSignup=async(req,res)=>
  {
      const {Name,email,password,confirmpassword}=req.body;
      try
      {
         if(!Name)
            {
                throw new Error("please provide name");
            }
            if(!email)
            {
                throw new Error("please provide email");
            }
            const exist=await userModel.findOne({email:email});
            if( exist)
            {
                return res.status(409).json({error:true,message:"user already registered"})
            }
            if(!password)
                {
                    throw new Error("please provide password");
                }
                if(!confirmpassword)
                    {
                        throw new Error("please confirm the password")
                    }
        const data= new userModel(req.body);
        const saveproduct=await data.save();
        res.status(201).json({saveproduct,error:false,message:"user registered sucessfully"});
      }
      catch(err)
      {      console.log(err);
           res.status(500).json({error:true,
             message:err.message||"internal server error"
           });
      }      
  }
  module.exports=userSignup;
    