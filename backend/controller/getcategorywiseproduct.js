const productModel=require('../model/productModel');
const getcategorywiseproduct=async(req,res)=>
    {    const {category}=req.body;
        try{
            const data=await productModel.find({category:category});
            res.status(200).json({catWiseData:data,success:true,error:false})
        }
        catch(error)
        {
           res.status(400).json({message:"product not found"})
        }
    }
    module.exports=getcategorywiseproduct;