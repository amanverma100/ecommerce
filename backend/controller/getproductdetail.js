 const productModel=require('../model/productModel');
const getproductdetail=async(req,res)=>
    {        const {id}=req.body;
         try{
             const data=await productModel.findById(id);   
              res.status(200).json({productdetail:data,success:true,error:false});  
         }
         catch(error)
         {
              res.status(400).json({message:'not able to fetch detail',error:true,success:false});
         }
    }
    module.exports=getproductdetail;