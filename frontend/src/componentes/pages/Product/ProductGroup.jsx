import React from 'react'
import CategoryWise from './CategoryWise'
const ProductGroup = () => {
  return (
    <div className='bg-gray pb-6 pt-3 '>
    <CategoryWise catg="mobile" heading="Mobile"></CategoryWise>
    <CategoryWise catg="refrigerator" heading="refrigerator"></CategoryWise>
    </div>
  )
}

export default ProductGroup
