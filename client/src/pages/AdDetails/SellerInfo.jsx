import React from 'react'

const SellerInfo = () => {
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4">
    <h3 className="text-lg font-semibold border-b pb-2 mb-4">Seller Information</h3>

    <div className="flex flex-col items-center space-x-4">
        <img width="80" height="80" className="rounded-full border" src="https://www.radiustheme.com/demo/wordpress/themes/classima/wp-content/uploads/2023/08/logo_5.png" alt="Seller Logo" />
        <div>
            <h4 className="text-base font-semibold my-2">
                <a href="https://www.radiustheme.com/demo/wordpress/themes/classima/store/radiustheme/" className="text-blue-500 hover:underline ">Name</a>
            </h4>
        </div>
    </div>

    <div className="mt-4 space-y-2">
       
     

        <div className="border p-2 rounded-md bg-gray-100 text-center space-y-4">
            <div className=" btn ">
                <p>View Phone</p>
            </div>
            <div className=" btn ">
            <p>View Email</p>
            </div>
            <div className=" btn ">
            <a >
         
              Facebook</a>
            </div>
            <div className=" btn ">
            <a  >
              Instagram</a>
            </div>
        
        </div>

    
    </div>
</div>

    </div>
  )
}

export default SellerInfo
