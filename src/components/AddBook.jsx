import { useQuery, useMutation } from '@apollo/client'
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from '../queries/queries';
import { useState } from 'react';
import { useModal } from '../context/ModalContext';

const AddBook = () => {

    const [bookName, setBookName] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [authorId, setAuthorId] = useState('');

    const [confirmation, setConfirmation] = useState('');
    const [alreadyExists, setAlreadyExists] = useState(false);
    const [isValidImageUrl, setIsValidImageUrl] = useState(true);

    const { addBookVisibility, setAddBookVisibility } = useModal();

    const { loading, error, data } = useQuery(GET_AUTHORS);
    const { loading: booksLoading, error: booksError, data: booksData} = useQuery(GET_BOOKS);
    const [addBookMutation] = useMutation(ADD_BOOK);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    const validateImageUrl = (url) => {
        const imageFileRegex = /\.(jpeg|jpg|png|webp|bmp)$/i;
        return imageFileRegex.test(url);
    }

    const handleImageUrlChange = (e) => {
        const newImageUrl = e.target.value;
        setImageUrl(newImageUrl);
        setIsValidImageUrl(true);
    }

    const handleModalClose = () => {
        setIsValidImageUrl(true);
        setAddBookVisibility(false);
        setConfirmation('');
        setBookName('');
        setGenre('');
        setDescription('');
        setImageUrl('');
        setAuthorId('');
        setAlreadyExists(false);
    }

    const capitalizeBookName = (bookname) => {
        
        const formattedBookName = bookName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

        return formattedBookName;
    }

    const logDetails = (e) => {

        e.preventDefault();
        console.log(authorId);

        if(isValidImageUrl){

            // Prevent form submission if URL is invalid
            if (!validateImageUrl(imageUrl)) {
                setIsValidImageUrl(false);
                return;
            }

            // Checks if book already exists
            const existingBook = booksData.books.find(
                (book) => {
                    return book.name === capitalizeBookName(bookName) && book.author.id === authorId;
                }
            );
    
            if (existingBook) {
                setAlreadyExists(true);
                return;
            }

            // Add book
            addBookMutation({
                variables: {
                    name: capitalizeBookName(bookName),
                    genre: genre,
                    description: description,
                    imageUrl: imageUrl,
                    authorId: authorId
                },
                refetchQueries: [{query: GET_BOOKS}]
            })
                .then((result) => {
                    setConfirmation('Book added successfully!');
                    setBookName('');
                    setGenre('');
                    setDescription('');
                    setImageUrl('');
                    setAuthorId('');
                    setIsValidImageUrl(true);
                    setAlreadyExists(false);
                })
                .catch((error) => {
                    console.error('Error adding book:', error);
                });
    
        }

    }

  return (
    <div>

        <form className={addBookVisibility ? 'add-book' : 'invisible'} onSubmit={logDetails}>
            <p className="close-btn" onClick={handleModalClose}>[close]</p>  

            <div className="field">
                <label>Book name: </label>
                <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} required/>
            </div>

            <div className="field">
                <label>Genre: </label>
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required/>
            </div>

            <div className="field">
                <label>Short description: </label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required/>
            </div>

            <div className="field">
                <label>Cover image link:</label>
                <input type="text" value={imageUrl} onChange={handleImageUrlChange} required/>

                {!isValidImageUrl && (
                    <p style={{ color: 'red' }}>Link to a valid image file!</p>
                )}
            </div>

            <div className="field">
                <label>Author:</label>
                <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} required>
                    <option value="">Select author</option>
                    {
                        data.authors.map( ({name, id})    => (
                            <option key={id} value={id}> {name} </option>
                        ))
                    }
                </select>
            </div>
            
            <div style={{'textAlign': 'center', 'padding' : '5px', 'color' : 'lime'}}>
            {confirmation && <p>{confirmation}</p> }
            </div>

            <div style={{'textAlign': 'center', 'padding' : '5px', 'color' : 'red'}}>
                {alreadyExists && <p>Book already exists.</p> }
            </div>

            <button>+</button>

        </form>

    </div> 
  )
}

export default AddBook