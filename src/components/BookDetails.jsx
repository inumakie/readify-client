import { useQuery, useMutation  } from "@apollo/client";
import { GET_BOOK, DELETE_BOOK } from "../queries/queries"
import { useModal } from "../context/ModalContext";
import './BookDetails.css';
import { useState } from "react";

const BookDetails = ({ selectedBook, setSelectedBook }) => {

    const [deleteCode, setDeleteCode] = useState('');
    const [deleteError, setDeleteError] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    const { detailsVisibility, setDetailsVisibility } = useModal();

    // FETCHING BOOK DATA
    const { loading, error, data } = useQuery(GET_BOOK, {
      variables: {id: selectedBook}
    });

    // DELETE BOOK MUTATION
    const [deleteBook] = useMutation(DELETE_BOOK, {
      update(cache) {
          // Update the cache after deleting the book
          cache.modify({
              fields: {
                  books(existingBooks, { readField }) {
                      return existingBooks.filter(
                          (bookRef) => selectedBook !== readField("id", bookRef)
                      );
                  },
              },
          });
      },
    });

    // DELETE BOOK LOGIC
    const handleBookDelete = () => {

      if(deleteCode === "delete"){
        deleteBook({
          variables: { id: selectedBook },
        }).then(() => {
            setSelectedBook(null);
            setDetailsVisibility(false);
            setDeleteCode("");
        });
      } else {
        setDeleteError(true);
      }

    };


    // DATA FETCHING LOGIC
    if (loading) return ;
    if (error) return <p>Error: {error.message}</p>;
  
    const book = data.book;

    const handleBookClick = (id) => {
      setSelectedBook(id);
    }

    const handleCodeChange = (e) => {
      setDeleteError(false);
      setDeleteCode(e.target.value);
    }

    const handleModalClose = () => {
      setDetailsVisibility(false)
      setDeleteError(false);
      setDeleteCode("");
      setShowDeleteForm(false);
    }

    // OTHER BOOKS BY SAME AUTHOR LOGIC
    const renderOtherBooks = () => {

      const otherBooksByAuthor = book.author.books.filter(
        (otherBook) => otherBook.id !== selectedBook
      );

      if (otherBooksByAuthor.length === 0 ){
        return;
      } else {
        return (
          <>
            <span>Other books by this author:</span>
            <ul className="other-books">
              {otherBooksByAuthor.map((book) => (
                <li key={book.id} className="other-books-links" onClick={() => handleBookClick(book.id)}>{book.name}</li>
              ))}
            </ul>
          </>
        )
      }
    }

  return (
    
    <div className={detailsVisibility ? 'book-details' : 'invisible'}>

      {book && (
        <>
          <p className="close-btn" onClick={handleModalClose}>[close]</p>  
          <div className="book-image-section">
            <img src={book.imageUrl} alt="" className="book-image-details"/>
          </div>

          <div className="book-details-section">
            <h2>{book.name}</h2>
            <p><span>Author:</span> {book.author.name}</p>
            <p><span>Genre:</span> {book.genre}</p>

            <p className="book-description">{book.description}</p>

            {renderOtherBooks()}

            <p onClick={() => setShowDeleteForm(true)} className="delete-book">Delete Book</p>

            <div className={showDeleteForm ? 'delete' : 'invisible'}>
              <input className="delete-field" type="password" placeholder="DELETE CODE" value={deleteCode} onChange={handleCodeChange}/>
              <button className="delete-btn" onClick={handleBookDelete}>Delete</button>
              {deleteError && <p style={{ "color": "black"}}>Wrong code!</p>}
            </div>


          </div>
        </>
      )}

    </div>
  )
}

export default BookDetails