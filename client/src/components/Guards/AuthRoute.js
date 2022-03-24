import { useContext } from 'react'
import UserContext from '../../context/UserDataContext';
import { Navigate, Outlet } from 'react-router-dom';


export default function AuthRoute() {
    const { userData } = useContext(UserContext);

    return userData ? <Outlet /> : <Navigate to="/login" />
}
