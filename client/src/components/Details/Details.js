import { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import ArticleContext from '../../context/ArticleContext';

import 'react-confirm-alert/src/react-confirm-alert.css';
import './Details.css';

import { Link, useParams } from 'react-router-dom';
import UserContext from '../../context/UserDataContext';
import SendMessage from './DetailsMessages/SendMessage';
import Comments from './Comments';

import { addLike, deleteArticle, getById } from '../../services/article';

export default function Details() {
    const { userData } = useContext(UserContext);
    const { setCurrentArt } = useContext(ArticleContext);

    const [art, setArt] = useState({});
    const [artOwner, setArtOwner] = useState({});

    const [likes, setLikes] = useState([]);
    const [isLiked, setIsLiked] = useState(false);

    const navigate = useNavigate();

    const { artId } = useParams();

    useEffect(() => {
        getById(artId)
            .then(res =>
                setArt(res.article,
                    setArtOwner(res.owner),
                    setLikes(state => ({ ...state, like: res.article.liked }))
                ));
    }, [artId, isLiked]);

    useEffect(() => {
        setCurrentArt(art)
    }, [setCurrentArt, art])

    //Delete Art
    const deleteArt = (artId) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () =>
                        await deleteArticle(artId).then(res => {
                            if (res.status !== 200) {
                                throw new Error('Failed to delete!')
                            }
                            navigate('/catalog')
                        })
                },
                {
                    label: 'No',
                }
            ]
        });

    }
    //Like article
    const likeArt = () => {
        const data = {
            artId,
            userId: userData._id,
            category: art.category
        }
        addLike(data).then(res => {
            if (res.status === 200) {
                setIsLiked(true)
            }
            setIsLiked(false)
        }).catch(err => {
            console.log(err.message);
        })
    }

    return (
        < section className="details">
            <h1 className="details-title">Details</h1>
            <article className="details-info">
                <div className="details-info-img">
                    <img src={art.image} alt="img-details" />
                </div>
                <p className="details-text">
                    {art.description}
                </p>
            </article>
            <article className="article-info">
                <ul className="art-info-items">
                    {art.category === 'animals' ?
                        <>
                            <li><strong>Name</strong>  {art.animalName}</li>
                            <li><strong>Type</strong>  {art.type}</li>
                            <li><strong>Birthday</strong>  {art.birthday}</li>
                        </>
                        : ''}
                    {art.category === 'cars' ?
                        <>
                            <li><strong>Marke</strong>  {art.marke}</li>
                            <li><strong>Model</strong>  {art.model}</li>
                            <li><strong>Year</strong>  {art.year}</li>
                        </>
                        : ''}
                    {art.category === 'clothes' ?
                        <>
                            <li><strong>Marke</strong>  {art.marke}</li>
                            <li><strong>Type</strong>  {art.type}</li>
                            <li><strong>Year</strong>  {art.year}</li>
                        </>
                        : ''}
                    <li><strong>Category</strong>  {art.category}</li>
                    <li><strong>City</strong>  {art.city}</li>
                    <li><strong>Date of publication</strong>  {art.createdAt}</li>
                    <li><strong>Price</strong>  ${art.price}</li>
                    {userData ?
                        <div className="seler-info">
                            <li><strong>Seller</strong>  {artOwner.username}</li>
                            <li><strong>Email</strong>  {artOwner.email}</li>
                        </div>
                        : ''}
                </ul>
                {userData && userData._id !== artOwner._id ? <SendMessage artOwnerName={artOwner.username} /> : ""}

            </article>
            <article className='likes-dtl'>
                <p className='likes-count'>Likes {likes.like?.length}</p>
            </article>

            {userData ? <article className="buttons">
                {userData._id === art.owner ?
                    <>
                        <Link to={`/edit/${artId}`} className="button edit">Edit</Link>
                        <Link to="#" onClick={() => deleteArt(artId)} className="button del">Delete</Link>
                    </>
                    : !likes.like?.includes(userData._id) ? <Link to="#" onClick={() => likeArt()} className="button like">Like</Link> : ""}
                <Link to="/catalog" className="button back">Back</Link>
            </article> : ""}
            <Comments category={art.category} />
        </section>
    )
}
