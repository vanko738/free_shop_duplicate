import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserDataContext';

import './UserProfile.css';
import ArtCard from '../Catalog/Card/ArtCard';
import { getUserLikedCreatedArticles } from '../../services/article';


export default function UserProfile() {
    const { userData } = useContext(UserContext);
    const [artData, setArtData] = useState([]);
    const [createdArtCount, setCreatedArtCount] = useState(0);


    useEffect(() => {
        getUserLikedCreatedArticles(userData._id).then(res => {
            setArtData(res.article,
                setCreatedArtCount(res.userArticle))

        })
    }, [userData._id]);

    return (
        <section className="profile">
            <div className="profile-img-liks-section">
                <div className="profile-img-section">
                    <img src={"/images/avatar.jpg"} alt="" />
                </div>
                <div className="uploadImg">
                    <form action="/action_page.php">
                        <label htmlFor="img">Select image: </label>
                        <input type="file" id="img" name="img" accept="image/*" />
                        <input className="submitbtn" type="submit" />
                    </form>
                </div>
                <div className="profile-links-section">
                    <nav>
                        <ul className="nav-links">
                            <li><Link to={`/messages/${userData._id}`}>Messages</Link></li>
                            <li><Link to={`/messag/${userData}`}>Settings</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="profile-info">
                <div className="profile-info-user">
                    <div className="user-info">
                        <h1 className="user-info-title">
                            User-Info</h1>
                        <p className="user-info-name"><span>Name</span>  <strong className="data-span">{userData.username}</strong></p>
                        <p className="user-info-email"><span>Email</span> <strong className="data-span">{userData.email}</strong></p>
                        <p className="user-info-liked-art"><span>Created Articles</span> <strong className="data-span">{createdArtCount}</strong></p>
                        <p className="user-info-created-art"><span>Liked Articles</span> <strong className="data-span">{artData.length}</strong></p>
                    </div>
                </div>
                <div className="profile-info-article">
                    <h1 className="profile-article-title">Last Liked Articles</h1>

                    {artData?.length > 0 ? artData.map(x => <ArtCard key={x._id} article={x} />) :
                        <p className='no-liked-art'> No liked articles yet!</p>
                    }
                </div>
            </div>
        </section >
    )
}
