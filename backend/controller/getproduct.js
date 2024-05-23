 const productModel=require('../model/productModel');
 const getproduct=async(req,res)=>
    {      
        try{
            const data=await productModel.find().sort({createdAt:-1});
              res.json({productdata:data,success:true,error:false}) 
         }
         catch(error)
         {
             res.status(404).json({message:"product not found",success:false,error:true});
         }  
    }
    module.exports=getproduct;