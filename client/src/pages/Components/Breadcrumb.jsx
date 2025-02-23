import React from 'react';

const Breadcrumb = ({ title, subTitle }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold text-gray-800 capitalize">
        {title} 
      </h1>
      <nav aria-label="Breadcrumbs" className="mt-4">
        <ul className="flex justify-center space-x-2 text-sm text-gray-600">
          <li>
            {subTitle}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Breadcrumb;
