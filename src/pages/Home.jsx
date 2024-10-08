import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axi from '../../axios';
import { ScaleLoader } from 'react-spinners';

const Home = () => {
  const [info, setInfo] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [minPages, setMinPages] = useState('');
  const [maxPages, setMaxPages] = useState('');

  useEffect(() => {
    setLoader(true);
    axi.get('/books')
      .then((response) => {
        setInfo(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  useEffect(() => {
    axi.get(`books/search?query=${search}`)
      .then((data) => {
        setInfo(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  function handleClick(book) {
    navigate(`/books/${book.id}`, { state: { book } });
  }

  function filterFunc(e) {
    e.preventDefault();

    if (minPages || maxPages) {
      axi.get(`books/filter?minPages=${minPages}&maxPages=${maxPages}`)
        .then((res) => {
          setInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="flex justify-center p-5 bg-green-400 mt-20">
      <div className="flex flex-col w-full  p-5 gap-7 ">
        <div className="flex justify-between mb-5 gap-96" >

          <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="p-3 rounded-md w-full bg-white border border-gray-300 outline-none" />
          
          <form className="flex gap-3 ml-5" onSubmit={filterFunc}>
            <input className="p-3 rounded-md bg-white border border-gray-300 outline-none" type="number" placeholder="Min" value={minPages} onChange={(e) => setMinPages(e.target.value)} />
            <input className="p-3 rounded-md bg-white border border-gray-300 outline-none" type="number" placeholder="Max" value={maxPages} onChange={(event) => setMaxPages(event.target.value)} />
            <button type="submit" disabled={loader} className="p-3 rounded-md bg-green-100 shadow-lg shadow-green-700/50 text-green hover:bg-green-700 hover:text-wrte " >{loader ? 'Loading...' : 'Filter'}</button>
          </form>
        
        </div>
        <div className='text-center'>
          {loader && <ScaleLoader color='green' size={300} />}
        </div>

        <div className="flex flex-wrap gap-7 justify-center">
          {loader ? (
            <div className="text-center text-white text-2xl">Loading...</div>
          ) : info.length > 0 ? (
            info.map((book) => (
              <div key={book.id} onClick={() => { handleClick(book); }} className="border p-5 mb-4 shadow-lg w-72 bg-white text-black rounded-xl cursor-pointer hover:shadow-green-900">
                <img className="mx-auto mb-4 h-56 w-full object-cover rounded-lg" src={book.thumbnailUrl} alt="book img" />
                <h2 className="text-xl font-bold text-gray-800 mb-3">{book.title}</h2>
                <p className="mb-3 text-gray-600"> <strong>Page Count:</strong> {book.pageCount} </p>
                <div className="flex gap-5 justify-between">
                  <div className="mb-2">
                    <strong className="block text-gray-700">Authors:</strong>
                    <ul className="text-gray-600">
                      {book.authors && book.authors.map((author, index) => (
                        <li key={index} className="text-sm">{author}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-2">
                    <strong className="block text-gray-700">Categories:</strong>
                    <ul className="text-gray-600">
                      {book.categories && book.categories.map((category, index) => (
                        <li key={index} className="text-sm">{category}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-xl">No books found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
