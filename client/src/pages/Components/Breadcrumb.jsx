import React from 'react';

const Breadcrumb = ({ title, subTitle }) => {
  return (
    <div className="bg-[#FFE5D5] p-6 rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold text-[#014D48] capitalize">
        {title} 
      </h1>
      <nav aria-label="Breadcrumbs" className="mt-4">
        <ul className="flex justify-center space-x-2 text-sm text-[#001C27]">
          <li className="text-[#FA8649] font-semibold">{subTitle}</li>
        </ul>
      </nav>
    </div>
  );
};

export default Breadcrumb;
