import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [ allBooks, setAllBooks ] = useState([]);
  const [ allBooksCopy, setAllBooksCopy ] = useState([]);

  const value = {
    searchTerm,
    setSearchTerm,
    searchResults,
    setSearchResults,
    allBooks,
    setAllBooks,
    allBooksCopy,
    setAllBooksCopy
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
