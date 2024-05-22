
const userModel=require('../model/userModel');
const users= async(req,res)=>
    { 
        const id=req.user.Id;
         const password=req.user.password;
        try{
         const admindetail = await userModel.findById(id);
         if(admindetail?.role==="Admin"&&admindetail?.password===password)
            {
                const data=await userModel.find();
                res.json({data:data,error:false,sucess:true})
            }
            else
            {
              throw new Error("Access denies");
            }
        }
        catch(error)
        {
              res.json({
                 message:error.message||"not able to fetch users data",
                error:true
                 })
        }
    }
    module.exports=users;