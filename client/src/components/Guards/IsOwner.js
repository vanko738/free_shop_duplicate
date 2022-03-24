import { useContext } from 'react'
import UserContext from '../../context/UserDataContext';

import { Navigate, Outlet } from 'react-router-dom';
import ArticleContext from '../../context/ArticleContext';

export default function IsOwner() {


    const { userData } = useContext(UserContext);
    const { currentArt } = useContext(ArticleContext);

    return userData._id === currentArt.owner ? <Outlet /> : <Navigate to="/" />
}
