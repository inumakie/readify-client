import { useQuery } from '@apollo/client'
import { GET_BOOKS } from '../queries/queries';
import BookDetails from './BookDetails';
import { useEffect, useState } from 'react';
import nocover from '../assets/nocover.png';
import { useModal } from '../context/ModalContext';
import { useSearch } from '../context/SearchContext';

const BookList = () => {

    const { searchResults, setAllBooks, setAllBooksCopy } = useSearch();
    const [selectedBook, setSelectedBook] = useState(null);
    const { showBookDetails } = useModal();

    const { loading, error, data } = useQuery(GET_BOOKS);

    useEffect(() => {
        if (data && data.books) {
            setAllBooks(data.books);
            setAllBooksCopy(data.books);
        }
    }, [data])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const booksToDisplay = searchResults.length > 0 ? searchResults : data.books;

    const handleBookClick = (id) => {
        setSelectedBook(id);
        showBookDetails();
    }

  return (
    <div id='book-container'>
        <ul id="book-list">
            {
                booksToDisplay.map( ({name, id, imageUrl}) => (
                    <li className="book" key={id} onClick={() => handleBookClick(id)}>
                        <span>{name}</span>
                        <img src={imageUrl ? imageUrl : nocover} alt="" className="book-image" />
                    </li>
                ))
            }
        </ul>
        <BookDetails selectedBook={selectedBook} setSelectedBook={setSelectedBook}/>
    </div>
  )
}

export default BookList