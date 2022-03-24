import { createContext, useState } from 'react';


const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {

    const [currentArt, setCurrentArt] = useState({});


    return (
        <ArticleContext.Provider value={{ currentArt, setCurrentArt }}>
            {children}
        </ArticleContext.Provider>
    );
}

export default ArticleContext;