import React from 'react'

const ProfileCard = ({profile,makeAdmin,removeAdmin}) => {
    const { name, email, phone, isAdmin } = profile;
  return (
<div className="bg-gray-200 p-4 rounded-lg w-full ">
  <div className="flex flex-col md:flex-row  justify-between items-center bg-white p-4 rounded-lg shadow-md space-y-2">
    <div className="space-y-1">
      <p className="text-dark-navy font-semibold">{name}</p>
      <p className="text-dark-navy">{email}</p>
      <p className="text-dark-navy">{phone}</p>
    </div>

    {isAdmin ? (
      <button onClick={() => removeAdmin(profile.email)} className="bg-red-500 text-white px-3 py-1 rounded">
        Remove Admin
      </button>
    ) : (
      <button onClick={() => makeAdmin(profile.email)} className="bg-green-500 text-white px-3 py-1 rounded">
        Make Admin
      </button>
    )}
   
  </div>
</div>

  )
}

export default ProfileCard
