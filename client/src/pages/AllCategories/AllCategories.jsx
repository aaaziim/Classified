import React from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import useCategory from '../../hooks/useCategory'
import CategoryCard from '../Home/CategoryCard'

const AllCategories = () => {
    const [categories] = useCategory()
  return (
    <div>
           <Breadcrumb
       title={"Categories"}
       subTitle={"Here you can find"}>
       </Breadcrumb>
  
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
        {categories?.map(category => (
         <CategoryCard key={category.id} category={category} />
         
        ))}
      </div>
    </div>
  )
}

export default AllCategories
