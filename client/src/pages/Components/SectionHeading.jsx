import React from 'react';

const SectionHeading = ({ heading, subHeading, headingClass, subHeadingClass }) => {
  return (
    <div className="text-center space-y-2 lg:w-4/12 mx-auto my-4 px-4">
      <p className={`text-[#FA8649] ${subHeadingClass}`}>--- {subHeading} ---</p>
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold uppercase border-y-2 py-2 text-[#014D48] border-[#FFE5D5] ${headingClass}`}>
        {heading}
      </h2>
    </div>
  );
};

export default SectionHeading;
