const productModel=require('../model/productModel');
const getcategoryproduct=async(req,res)=>
    {
        try{
            const productdata=await productModel.distinct('category');
              const categorydata=[];
              for(let category of productdata)
                {
                const data=await productModel.findOne({category:category});
                if(data)
                {   
                categorydata.push(data);
                }
               }
            res.status(200).json({categoryproduct:categorydata,error:false,success:true});
        }
        catch(error)
        {
            res.status(404).json({message:"product not found",error:true,success:false})
            
        }
    }
    module.exports=getcategoryproduct;