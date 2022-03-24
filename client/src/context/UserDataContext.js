import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const UserContext = createContext();

export const AuthProvider = ({ children }) => {

    const [userData, setUserData] = useLocalStorage('user', {
        _id: '',
        username: '',
        email: '',
        token: '',
    })

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
}


export default UserContext;