import React from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import useCategory from '../../hooks/useCategory'
import CategoryCardSuggestions from '../Home/CategoryCardSuggestions'
import DynamicTitlePage from '../Components/DynamicTitlePage'

const Suggesstions = () => {
    const [categories] = useCategory()
  return (
    <div>
      <DynamicTitlePage title={`SideGurus Suggestion | SideGurus`} />

           <Breadcrumb
       title={"SideGurus Suggestion"}
       subTitle={"Want to start a gig but don't know where to begin? Turn your passion into income with our SideGuru suggestions: Here is an extensive list of our services and categories find the one that suits you best:"}>
       </Breadcrumb>
  
      <div className="grid grid-cols-1 justify-items-center gap-4 my-10 px-4">
        {categories?.map(category => (
         <CategoryCardSuggestions key={category.id} category={category} />
         
        ))}
      </div>
    </div>
  )
}

export default Suggesstions;
