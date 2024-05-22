 const userLogout=(req,res)=>
    {
       try{
          localStorage.removeItem('token');
        
       }
       catch(error)
       {
         //code 
       }
    }