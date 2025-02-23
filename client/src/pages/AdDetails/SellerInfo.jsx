import React from 'react'

const SellerInfo = () => {
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4">
    <h3 className="text-lg font-semibold border-b pb-2 mb-4">Seller Information</h3>

    <div className="flex items-center space-x-4">
        <img width="80" height="80" className="rounded-full border" src="https://www.radiustheme.com/demo/wordpress/themes/classima/wp-content/uploads/2023/08/logo_5.png" alt="Seller Logo" />
        <div>
            <h4 className="text-base font-semibold">
                <a href="https://www.radiustheme.com/demo/wordpress/themes/classima/store/radiustheme/" className="text-blue-500 hover:underline">RadiusTheme</a>
            </h4>
        </div>
    </div>

    <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-700">
            <i className="fa fa-shopping-basket mr-2"></i>
            <a href="https://www.radiustheme.com/demo/wordpress/themes/classima/store/radiustheme/" className="text-blue-500 hover:underline">View Store</a>
        </div>

     

        <div className="border p-2 rounded-md bg-gray-100 text-center">
            <div className="text-lg font-bold">4587654XXX</div>
   
        </div>

        <div className="mt-2">
            <a href="https://www.radiustheme.com/demo/wordpress/themes/classima/my-account/" className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                <i className="fa fa-comments mr-2"></i> Email
            </a>
        </div>
    </div>
</div>

    </div>
  )
}

export default SellerInfo
