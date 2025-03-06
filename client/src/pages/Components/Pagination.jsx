import React from 'react'

const Pagination = ({ page, setPage, totalPages }) => {
 

  return (
<div className="mt-4 flex justify-center">
    <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-4 py-2 bg-gray-300 text-black rounded-l"
    >
        Previous
    </button>
    <span className="px-4 py-2">{page} of {totalPages}</span>
    <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 bg-gray-300 text-black rounded-r"
    >
        Next
    </button>
</div>
  )
}

export default Pagination
