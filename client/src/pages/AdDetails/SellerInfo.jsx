import React from 'react'

const SellerInfo = ({author}) => {
  const { email, phone, facebook, instagram } = author;
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-[#014D48]">Seller Information</h3>

        <div className="flex flex-col items-center space-x-4">
          <img 
            width="80" 
            height="80" 
            className="rounded-full border" 
            src="https://www.radiustheme.com/demo/wordpress/themes/classima/wp-content/uploads/2023/08/logo_5.png" 
            alt="Seller Logo" 
          />
          <div>
            <h4 className="text-base font-semibold my-2 text-[#014D48]">
              <a 
                href="https://www.radiustheme.com/demo/wordpress/themes/classima/store/radiustheme/" 
                className="text-[#FA8649] hover:underline"
              >
                Name
              </a>
            </h4>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="border p-2 rounded-md bg-[#FFE5D5] text-center space-y-4 grid grid-cols-2 gap-4">
            <div className="btn bg-white text-[#001C27] p-2 rounded-md border border-[#001C27] hover:bg-[#FA8649] hover:text-white">
              <p>{phone}</p>
            </div>
            <div className="btn bg-white text-[#001C27] p-2 rounded-md border border-[#001C27] hover:bg-[#FA8649] hover:text-white">
              <p>{email}</p>
            </div>
            <div className="btn bg-white text-[#001C27] p-2 rounded-md border border-[#001C27] hover:bg-[#FA8649] hover:text-white">
              <a href={facebook} className="text-[#001C27] hover:text-white">Facebook</a>
            </div>
            <div className="btn bg-white text-[#001C27] p-2 rounded-md border border-[#001C27] hover:bg-[#FA8649] hover:text-white">
              <a href={instagram} className="text-[#001C27] hover:text-white">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerInfo
