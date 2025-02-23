import Banner from "../Components/Banner"
import CategorySlider from "../Components/CategorySlider"
import TypeTab from "../Components/TypeTab"
import { Helmet  } from 'react-helmet-async';
import CategoryCard from "./CategoryCard";
import LocationCard from "./LocationCard";
import { Link } from "react-router";
 
const Home = () => {
  return (
    <div>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className='text-center space-y-2  lg:w-4/12 mx-auto my-4'>
        <p className='text-yellow-600'>---Find what interests you the most---</p>
        <h2 className='text-2xl font-bold uppercase border-y-2 py-2'>Browse From Top Categories</h2>
    </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 my-10">
          <CategoryCard></CategoryCard>
          <CategoryCard></CategoryCard>
          <CategoryCard></CategoryCard>
          <CategoryCard></CategoryCard>
          <CategoryCard></CategoryCard>
          <CategoryCard></CategoryCard>
          <CategoryCard></CategoryCard>
          <CategoryCard></CategoryCard>
          <CategoryCard></CategoryCard>
          <CategoryCard></CategoryCard>
          <CategoryCard></CategoryCard>
          <CategoryCard></CategoryCard>

        </div>
<div>
<div className='text-center space-y-2  lg:w-4/12 mx-auto my-4'>
        <p className='text-yellow-600'>---Find what interests you the most---</p>
        <h2 className='text-2xl font-bold uppercase border-y-2 py-2'>Latest Ads</h2>
    </div>
  
  
  </div>     
      {/* <Banner></Banner> */}
      <TypeTab ></TypeTab>
      {/* <div className="my-8">
        <h2 className="text-3xl font-bold text-center underline">Find by Category</h2>
      </div>
      <div>
      <CategorySlider></CategorySlider>
      </div> */}


<div className='text-center space-y-2  lg:w-4/12 mx-auto my-4'>
        <p className='text-yellow-600'>---Find what interests you the most---</p>
        <h2 className='text-2xl font-bold uppercase border-y-2 py-2'>Browse From Top Locations</h2>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 my-10">
      <LocationCard></LocationCard>
      <LocationCard></LocationCard>
      <LocationCard></LocationCard>
      <LocationCard></LocationCard>
      <LocationCard></LocationCard>
      <LocationCard></LocationCard>
      <LocationCard></LocationCard>
      <LocationCard></LocationCard>
      <LocationCard></LocationCard>
      <LocationCard></LocationCard>
      <LocationCard></LocationCard>
      <LocationCard></LocationCard>

      </div>
      <div className='my-4 text-center' >
           <Link to="/post-events">
  <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition w-60">
     All Locations
    </button>
  </Link>
           </div>
    </div>
  )
}

export default Home
