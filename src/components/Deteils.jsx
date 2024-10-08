import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Details = () => {
  const { state } = useLocation();
  const { book } = state || {}; 
  const navigate = useNavigate();

  function handleBack() {
    navigate('/');
  }

  return (
    <div className='flex flex-wrap flex-col  bg-green-300'>
      
      <div className='w-full bg-green-300 pb-[163px] mt-20'>
        {book ? (
          <div className="flex flex-col items-center p-5">
            <img className="mb-5 h-96 w-64 object-cover" src={book.thumbnailUrl} alt={book.title} />
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <p className="text-lg mb-4"><strong>Authors:</strong> {book.authors.join(', ')}</p>
            <p className="text-lg mb-4"><strong>Categories:</strong> {book.categories.join(', ')}</p>
            <p className="text-lg mb-4"><strong>Page Count:</strong> {book.pageCount}</p>
            <button onClick={handleBack} className="bg-blue-500 text-white px-4 py-2 rounded-md">Back to Home</button>
          </div>
        ) : (
          <p>No book selected</p>
        )}
      </div>
    </div>
  );
};

export default Details;
