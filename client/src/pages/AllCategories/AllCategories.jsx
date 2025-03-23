import React from "react";
import Breadcrumb from "../Components/Breadcrumb";
import useCategory from "../../hooks/useCategory";
import CategoryCard from "../Home/CategoryCard";
import DynamicTitlePage from "../Components/DynamicTitlePage";
import { Link } from "react-router";

const AllCategories = () => {
  const [categories] = useCategory();
  return (
    <div>
      <DynamicTitlePage title={`Categories | SideGurus`} />

      <Breadcrumb
        title={"Categories"}
        subTitle={"Here you can find"}
      ></Breadcrumb>

      <div className="grid grid-cols-1 justify-items-center md:grid-cols-3 lg:grid-cols-4 gap-4 my-10 px-4">
        {categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      <Link to={`/sidegurus-suggestions`}>
        <button className="px-6 py-3 bg-[#014D48] text-white rounded-lg shadow-md hover:bg-[#FA8649] transition md:w-full mb-4">
          SideGurus Suggestions
        </button>
      </Link>
    </div>
  );
};

export default AllCategories;
