const mongoose=require('mongoose');
const {Schema}=mongoose;
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
 const userSchema= new Schema(
    {
        Name:{
            type:String,
            required:true,
            },
         email:
         { 
            type:String,
            required:true,
            unique:true,
         },
         password:
         {
            type:String,
            required:true,
         },
         confirmpassword:
         {
             type:String,
             required:true,
         },
         profilepic:
         {
            type:String,
         },
         role:{
            type:String,
            default:"Admin",
         },
       
    },
    {
       timestamps:true 
    }
 )
 userSchema.pre('save',async function(next){
     if(this.isModified('password')){
      if(this.password!=this.confirmpassword)
        {    
            return next(new Error('Password does not match'));
            
        }
         const salt= await bcrypt.genSalt(10);
         const newpass=await bcrypt.hash(this.password,salt);
         this.password=newpass;
         this.confirmpassword=undefined; 
         console.log(this);
          next();
      }
        else
        {
            
             next(); 
        }
        
 });

   userSchema.methods.generateToken=  function()
   {   const private_key=process.env.PRIVATE_KEY;
      try
      { 
         return jwt.sign({userId:this._id.toString(),"password":this.password},
        private_key,{
            expiresIn:"5d"
        }
      )
   }
   catch(err)
   {
      console.error(err);
   }
   }
 const userModel=mongoose.model('user',userSchema);
 module.exports=userModel;
