import React from 'react'

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = []

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="flex justify-center mt-6">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 mx-1 border rounded-lg ${currentPage === number ? 'bg-[#FA8649] text-white' : 'bg-white text-[#001C27] hover:bg-gray-200'}`}
        >
          {number}
        </button>
      ))}
    </div>
  )
}

export default Pagination
