require('dotenv').config();
const express=require('express');
const cors=require('cors');
const connectdb=require('./config/database')
const router=require('./routes')
const cookieParser=require('cookie-parser');
const app=express();
app.use(cors({origin:"https://amanverma100.github.io/ecommerce"}));
 //app.use(cookieParser());
app.use(express.json());
app.use('/api',router);
const PORT=process.env.PORT;
connectdb().then(()=>
app.listen(PORT,()=>
{
    console.log(`app listen on port no ${PORT}`);
}))
