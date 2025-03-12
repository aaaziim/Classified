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
   
  </div>
</div>

  )
}

export default ProfileCard
