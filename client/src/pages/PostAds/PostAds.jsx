import React from "react";

import { Link } from "react-router-dom";
import DynamicTitlePage from "../Components/DynamicTitlePage";

const PostAds = () => {
  return (
    <div className="min-h-[calc(100vh-400px)] flex flex-col justify-center items-center bg-[#FFE5D5] ">
            <DynamicTitlePage title={`Post Ad | SideGurus`} />

      <div className="flex flex-col items-center gap-6">
        <Link to="/post-services">
          <button className="px-6 py-3 bg-[#014D48] text-white rounded-lg shadow-md hover:bg-[#012F2D] transition-all md:w-60 font-semibold text-lg">
            Post Service
          </button>
        </Link>

        <Link to="/post-events">
          <button className="px-6 py-3 bg-[#FA8649] text-white rounded-lg shadow-md hover:bg-[#D76D35] transition-all md:w-60 font-semibold text-lg">
            Post Event
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PostAds;
