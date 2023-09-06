import { gql } from '@apollo/client'

                                    // BOOK QUERIES

const GET_BOOKS = gql`

    query getBooks {
        books {
            name
            id
            imageUrl
            author {
              id
              name
            }
        }
    }
    
`

const GET_BOOK = gql`

    query getBook($id: ID) {
        book(id: $id) {
            id
            name
            genre
            imageUrl
            description
            author {
              id
              name
              books {
                name
                id
              }
            }

        }
    }

`

const ADD_BOOK = gql`

  mutation AddBook($name: String!, $genre: String!, $description: String!, $imageUrl: String!, $authorId: ID!) {

    addBook(name: $name, genre: $genre, description: $description, imageUrl: $imageUrl, authorId: $authorId) {
      id
      name
      genre
      description
      imageUrl
    }
    
  }

`

const DELETE_BOOK = gql`

  mutation DeleteBook($id: ID!){

    deleteBook(id: $id){
      id
      name
      genre
      description
      imageUrl
    }

  }

`

                                    // AUTHOR QUERIES

const GET_AUTHORS = gql`

    query getAuthors {
        authors {
            name
            id
        }
    }

`

const ADD_AUTHOR = gql`

  mutation AddAuthor($name: String!) {

    addAuthor(name: $name) {
      name
    }
    
  }

`

export { GET_BOOKS, GET_AUTHORS, ADD_BOOK, GET_BOOK, DELETE_BOOK, ADD_AUTHOR };