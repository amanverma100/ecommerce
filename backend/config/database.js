const mongoose=require('mongoose');
async function connectdb(){

 try{
      await mongoose.connect(process.env.DATABASE_URL);
      console.log('database connected successfully');
  }
  catch(error){
     console.log("error in connecting database",error);
  }
    
}
module.exports=connectdb;