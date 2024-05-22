const productModel=require('../model/productModel');
const userModel=require('../model/userModel');
const updateproduct=async(req,res)=>
    {      
          const {_id,...payload}=req.body
         
          const userId=req.user.Id;
         const userPassword=req.user.password;
           try{
               const userData=await userModel.findById(userId);
             if(userData&&userData?.password===userPassword&&userData?.role==='Admin')
                {

                    await productModel.findByIdAndUpdate(_id,payload)
                    res.status(200).json({message:"product updated successfully",success:true})
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
    module.exports=updateproduct;