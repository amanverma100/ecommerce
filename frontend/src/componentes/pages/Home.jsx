import React from 'react'
import CategoryItems from './Product/CategoryItems'
import Banner from './Banner'
const Home = () => {
        
  return (
    <div className='bg-gray-300 pt-[3px] md:pt-[6px]  md:px-2'>
    
    <CategoryItems/>
     <Banner/>
    </div>
  )
}

export default Home
