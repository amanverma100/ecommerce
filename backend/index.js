require('dotenv').config();
const express=require('express');
const cors=require('cors');
const connectdb=require('./config/database')
const router=require('./routes')
const cookieParser=require('cookie-parser');
const app=express();
app.use(cors({origin:"http://localhost:5173"}));
 //app.use(cookieParser());
app.use(express.json());
app.use('/api',router);
const PORT=process.env.PORT;
connectdb().then(()=>
app.listen(PORT,()=>
{
    console.log(`app listen on port no ${PORT}`);
}))
