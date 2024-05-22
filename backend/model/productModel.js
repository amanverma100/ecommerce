const mongoose=require('mongoose');
const {Schema}=mongoose;
const productSchema=new Schema(
    {
        productName:{
            type:String,
            required:true
        },
        productBrand:{
            type:String,
        },
        category:
        {
            type:String,
            required:true
        },
        productImage:[],
        description:{
            type:String
        },
        price:{
            type:Number,
            required:true
        },
        discountedprice:{
          type:Number,
          required:true
        },
    },
    {
        timestamps:true
    }
)
const productModel=mongoose.model("product",productSchema);
module.exports=productModel;