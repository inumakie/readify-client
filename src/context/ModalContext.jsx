import { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }){
    const [detailsVisibility, setDetailsVisibility] = useState(false);
    const [addBookVisibility, setAddBookVisibility] = useState(false);
    const [addAuthorVisibility, setAddAuthorVisibility] = useState(false);

    const showBookDetails = () => {
        setDetailsVisibility(true);
        setAddBookVisibility(false);
        setAddAuthorVisibility(false);
    }

    const showAddBook = () => {
        setDetailsVisibility(false);
        setAddBookVisibility(true);
        setAddAuthorVisibility(false);
    }

    const showAddAuthor = () => {
        setDetailsVisibility(false);
        setAddBookVisibility(false);
        setAddAuthorVisibility(true);
    }

    return(
        <ModalContext.Provider
            value={{
                detailsVisibility,
                setDetailsVisibility,
                addBookVisibility,
                setAddBookVisibility,
                addAuthorVisibility,
                setAddAuthorVisibility,
                showBookDetails,
                showAddBook,
                showAddAuthor
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}

export function useModal(){
    return useContext(ModalContext);
}