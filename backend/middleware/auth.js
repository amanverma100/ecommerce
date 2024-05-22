const jwt=require('jsonwebtoken');
const Auth= async(req,res,next) =>
    {   
        const bearertoken=req.header('Authorization');
        const PRIVATE_KEY=process.env.PRIVATE_KEY;
        try{
            if(!bearertoken)
             {   
                 console.log("token not found");
                throw new Error("please login to access");   
             }
          else
          {
            const arr=bearertoken.split(' ');
          if(arr.length==2&&arr[0]==="Bearer")
            {
          const token=arr[1];
          if(token==="null")
            {
            throw new Error("JWT token not found");
            }
          const payload=jwt.verify(token,PRIVATE_KEY);
          req.user= req.user||{}
          req.user.Id=payload.userId;
          req.user.password=payload.password;
            next();
             }
             else
             {
                throw new Error("please login");
             }
            
         }
        }
         catch(err)
         {     msg=err.message||"please verified to login";
               res.status(401).json({message:msg});
              
         }

        }
    
    module.exports=Auth;