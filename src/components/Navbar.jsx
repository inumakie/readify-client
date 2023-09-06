import React, { useState } from 'react'
import { useModal } from '../context/ModalContext'
import { useSearch } from '../context/SearchContext';
import logo from '../assets/indexlogo.png';

const Navbar = () => {

  const { searchTerm, setSearchTerm, setSearchResults, allBooks, allBooksCopy } = useSearch();
  const {showAddBook, showAddAuthor} = useModal();

  const handleSearch = (e) => {

    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm.trim() === "") {
      setSearchResults(allBooks);
    } else {
      // Perform the search query
      const filteredBooks = allBooksCopy.filter(book =>
          book.name.toLowerCase().includes(searchTerm.toLowerCase())
          ||
          book.author.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
      setSearchResults(filteredBooks);
    }
  }

  return (
    <div className='navbar'>

        <img src={logo} alt="" id="logo"/>

        <input type="text" id="searchbar" value={searchTerm} onChange={handleSearch} placeholder='Search for title or author'/>


        <ul className='links'>
            <li>
                <button className='link' onClick={showAddBook}>+ BOOK</button>
            </li>
            <li>
                <button className='link' onClick={showAddAuthor}>+ AUTHOR</button>
            </li>
        </ul>

    </div>
  )
}

export default Navbar