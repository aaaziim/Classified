import React, { useEffect } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import useCategory from "../../hooks/useCategory";
import CategoryCardSuggestions from "../Home/CategoryCardSuggestions";
import DynamicTitlePage from "../Components/DynamicTitlePage";

const Suggesstions = () => {
  const [categories] = useCategory();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <DynamicTitlePage title={`SideGurus Suggestions | SideGurus`} />

      <div className="bg-[#FFE5D5] p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-[#014D48] capitalize">
          SideGurus Suggestions
        </h1>
        <nav aria-label="Breadcrumbs" className="mt-4">
          <ul className="space-x-2 text-sm text-[#001C27]">
            <li className="text-[#FA8649] font-semibold">
              Want to start a gig but don't know where to begin? Turn your
              passion into income with our SideGurus suggestions:
            </li>
            <li className="text-[#FA8649] font-semibold">
              Here is an extensive list of our services and categories find the
              one that suits you best:
            </li>
          </ul>
        </nav>
      </div>

      <div className="grid grid-cols-1 justify-items-center gap-4 my-10 px-4">
        {categories?.map((category) => (
          <CategoryCardSuggestions key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Suggesstions;
