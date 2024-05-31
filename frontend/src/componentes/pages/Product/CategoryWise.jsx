import React from 'react'
import { useState } from 'react'
import summaryAPI from '../../../common';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { FaRupeeSign } from "react-icons/fa";
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
const CategoryWise = ({catg,heading}) => {
  const [getloading,setloading]=useState(true);
  const [getCatData,setCatData]= useState([]);
  const [transX,setTransX]=useState(0);
    const fetchcategoryproduct= async()=>
      {    
        try{
          setloading(true);
         const response= await axios.post(summaryAPI.categorywise.url,{
          category:catg
         });
          const data=response?.data?.catWiseData;
          if(response?.data?.success===true)
          setCatData(response?.data?.catWiseData);
         setloading(false);

      }
      catch(error)
      {
           if(error.response?.data?.message)
            {
              toast.error(error.response.data.message);
            }
      }    
      }
      function rightShift()
     {      
          if(transX<getCatData.length-1)
            {    
                setTransX((prev)=>prev+1);
            }
            
     }
     function leftShift()
     {
        if(transX>0)
            {
              setTransX((prev)=>prev-1);
            }
     }
      useEffect(()=>
      {
      fetchcategoryproduct();
      },[])
   const loadinglist=new Array(10).fill(null);
  return (
    <div className='bg-white md:py-4 md:px-4 mb-2 rounded-sm'>
    <h2 className='text-black md:pl-4 pl-1 md:text-xl text-[16px] capitalize md:pb-2 pb-1'>{heading}</h2>
    <div className='flex relative items-center px-2 overflow-x-scroll gap-2  scrollbardisplaynone md:gap-4 gap:2 w-full flex-row  py-1  min-h-[200px] md:min-h-[300px]'>
      {
         getloading?(
          loadinglist.map((element,index)=>
       {
           return(
              <div className=' h-[200px] md:h-[250px] w-[150px] md:w-[200px] rounded-md cursor-pointer  bg-gray-100 'key={index}></div>   
           )
       })
     ):
     (
      getCatData?.map((element,index)=>
   {
       return(
          <div className=' h-[200px] md:h-[300px]  w-[180px] px-1 py-2  hover:scale-105 md:w-[250px] rounded-md   border-gray-400 border-dashed border-[1px]'key={index} style={{transform:`translateX(-${transX*100}%)`}}>
            <img src={element?.productImage[0]} className='md:h-[70%] h-[60%] w-full object-contain p-2' ></img>
            <div className=' truncate px-1  md:px-2  text-black text-center text-[10px] md:text-[12px] '>{element?.productName}</div>
            <div className='flex items-center gap-2 pl-2 pt-1'>
            <div className=' truncate    flex  line-through text-green-600  text-[10px] md:text-[12px] '><FaRupeeSign/>{element?.price}</div>
            <div className=' truncate   flex   text-red-600 text-[10px] md:text-[12px] '><FaRupeeSign/>{element?.discountedprice}</div>
            </div>
            <div className=''><button className='rounded-md border-0 text-[10px] md:text-[14px] w-full p-1  bg-red-600 '>Add to Cart</button></div>
            </div>
            
       )
   })
 )
      }
     <FaChevronLeft className='text-[2vw] cursor-pointer h-2vw w-2vw  rounded-full hover:bg-gray-800 text-red-600 absolute md:top-[10vw] top-[14vw] mleft-1 left-1 ' onClick={leftShift}/>
<FaChevronRight className='text-[2vw] h-2vw w-2vw  rounded-full hover:bg-gray-800  cursor-pointer text-red-600 absolute md:top-[10vw] top-[14vw] right-1 right-1 ' onClick={rightShift}/>
    </div>
    </div>
  )
}

export default CategoryWise
