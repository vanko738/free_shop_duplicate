import React from 'react';

import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import queryString from 'query-string'
import { getAll, getByCategory, getUserArticles } from '../../../services/article';

import ArtCard from '../Card';
import './Catalog.css';
import UserContext from '../../../context/UserDataContext';

export default function Catalog() {
    const [articles, setArticle] = useState([]);


    const { search } = useLocation();
    const { name } = queryString.parse(search);

    const { userData } = useContext(UserContext);

    useEffect(() => {
        if (name === 'clothes' || name === 'animals' || name === 'cars') {
            getByCategory(name).then(result => {
                setArticle(result.article);
            }).catch(err => {
                console.log(err.message);
            })
        } else if (name === "myArticles") {
            getUserArticles(userData._id).then(result => {
                setArticle(result.article);
            }).catch(err => {
                console.log(err.message);
            });
        } else {
            getAll().then(result => {
                setArticle(result.article);
            }).catch(err => {
                console.log(err.message);
            });
        }
        return () => {
            setArticle([]);
        };
    }, [name, userData._id])

    return (
        <section className="catalog">
            <h1 className="catalog-title">All added Articles</h1>
            <article className="cards">
                {articles?.length > 0 ? articles.map(x => <ArtCard key={x._id} article={x} />) :
                    <h1 className="sv-msg">No Articles</h1>
                }

            </article>
        </section >
    )
}
