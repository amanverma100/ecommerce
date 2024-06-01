import React from 'react';
import axios from 'axios';
import summaryAPI from '../../../common';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
const ProductDetail = () => {
     const params=useParams(); 
    const [isloading,setloading]=useState(false);
    const [getdata,setdata]=useState(
       { productName:"",
         productBrand:"",
         category:"",
         productImage:[],
         description:"",
         price:"",
         discountedprice:"", 
    }
    );
     const productid=params?.id;
     const fetchdetail=async()=>
        {
             
            try{
             setloading(true);
            const response=await axios.post(summaryAPI.productdetail.url,
                {
                    id:productid
                }
            );
             if(response?.data?.success===true)
                {
                   setdata(response?.data?.productdetail);
                   setloading(false);
                }
             
            }
            catch(error)
            {
     
            }
        }
        console.log("productdetail",getdata);
        console.log("param",params);
        useEffect(()=>
            {
                fetchdetail();
            }
        ,[]);

  return (
    <div className='h-[calc(100vh-8rem)] overflow-hidden bg-red-600'>
    <div className='flex md:h-[10rem] gap-2 overflow-y-auto scrollbardisplaynone  h-[400px] w-[100px] w-[200px] bg-blue-200 flex-col  '>
    { getdata?.productImage.map((element,index)=>{
     return (
    <div className='w-20 h-20 p-2 bg-white'>
     <img className=' object-scale-down'  src={element}></img>
    </div>
     )
 } )
 }
    </div>
    
    </div>
  )
}

export default ProductDetail
