const productModel=require('../model/productModel')
const userModel=require('../model/userModel');
const uploadproduct= async(req,res)=>
    {         const id=req.user.Id 
              const password=req.user.password;          
        try
        {
            const adminData=  await userModel.findById(id);
            if(adminData&&adminData?.password===password && adminData?.role==="Admin")
           {
            const data=new productModel(req.body);
            const saveproduct= await data.save();
           res.status(200).json({saveproduct,message:"product save successfully",success:true})
           }
           else
           {
             res.status(401).json({error:true,message:"only admin can access ",success:false});
           }
        
        }


        catch(error)
        {
            res.json({
                message:"failed to upload",
                 error:true,
                 success:false
            })
        }
    }
module.exports=uploadproduct;