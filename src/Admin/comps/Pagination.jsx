
import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  return (
    <div className="flex justify-center items-center mt-5">
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`mx-1 px-3 py-1 ${currentPage === number ? 'bg-primary text-white' : 'bg-gray-200 text-black'} rounded`}
        >
          {number}
        </button>
      ))}
    </div>
  )
}


export default Pagination

