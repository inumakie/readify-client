import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';
import { useQuery, useMutation } from '@apollo/client'
import { GET_AUTHORS, ADD_AUTHOR } from '../queries/queries';

const AddAuthor = () => {

  const [authorName, setAuthorName] = useState('');
  const [error, setError] = useState(null);
  const [confirmation, setConfirmation] = useState('');
  const { addAuthorVisibility, setAddAuthorVisibility } = useModal();
  const [addAuthorMutation] = useMutation(ADD_AUTHOR);
  const { data } = useQuery(GET_AUTHORS);

  const handleModalClose = () => {
    setAddAuthorVisibility(false);
    setConfirmation('');
    setAuthorName('');
    if (error !== ''){
      setError('');
    }
  }

  const handleAuthorChange = (e) => {

    e.preventDefault();
    setConfirmation('');

    setAuthorName(e.target.value);
    if (error !== ''){
      setError('');
    }

  }

  const capitalizeAuthorName = (authorName) => {
        
    const formattedAuthorName = authorName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

    return formattedAuthorName;
  }

  const logDetails = (e) => {

    e.preventDefault();

    if (data.authors.some(author => author.name.toLowerCase() === authorName.toLowerCase())) {
      setError('Author already exists in the database.');
      return;
    }

    addAuthorMutation({
      variables: {
          name: capitalizeAuthorName(authorName),
      },
      refetchQueries: [{query: GET_AUTHORS}]
    })
      .then((result) => {
          console.log('Author added:' , result.data.addAuthor);
          setAuthorName('');
          setError(null);
          setConfirmation('Author created successfully!');
      })
      .catch((error) => {
          console.error('Error adding author:', error);
          setError('Error adding author');
      });

  }

  return (
    <div>
        <form className={addAuthorVisibility ? 'add-book' : 'invisible'} onSubmit={logDetails}>

        <p className="close-btn" onClick={handleModalClose} >[close]</p>
          <div className="field">
            <label htmlFor="">Author name:</label>
            <input type="text" value={authorName} onChange={handleAuthorChange} required/>
          </div>
          <div style={{'textAlign': 'center', 'padding' : '5px', 'color' : 'red'}}>
            {error && <p>{error}</p> }
          </div>
          <div style={{'textAlign': 'center', 'padding' : '5px', 'color' : 'lime'}}>
            {confirmation && <p>{confirmation}</p> }
          </div>
          <button>+</button>

        </form>
    </div>
  )
}

export default AddAuthor