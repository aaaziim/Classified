import Banner from "../Components/Banner"
import CategorySlider from "../Components/CategorySlider"
import TypeTab from "../Components/TypeTab"

 
const Home = () => {
  return (
    <div>
      <h1 className="text-6xl">Home</h1>
      <Banner></Banner>
      <TypeTab ></TypeTab>
      <div className="my-8">
        <h2 className="text-3xl font-bold text-center underline">Find by Category</h2>
      </div>
      <div>
      <CategorySlider></CategorySlider>
      </div>
    </div>
  )
}

export default Home
