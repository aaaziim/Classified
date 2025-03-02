import React from 'react'

const ProfileCard = ({profile}) => {
    const { name, email, phone } = profile;
  return (
<div className="bg-gray-200 p-4 rounded-lg ">
  <div className="flex flex-col md:flex-row  justify-between items-center bg-white p-4 rounded-lg shadow-md space-y-2">
    <div className="space-y-1">
      <p className="text-dark-navy font-semibold">{name}</p>
      <p className="text-dark-navy">{email}</p>
      <p className="text-dark-navy">{phone}</p>
    </div>
    <button className="flex items-center bg-[#FA8649] text-white px-6 py-3 rounded-lg hover:bg-[#014D48] transition">
      View
    </button>
  </div>
</div>

  )
}

export default ProfileCard
