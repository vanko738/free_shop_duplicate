
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/UserDataContext';
import { ArticleProvider } from './context/ArticleContext';


import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './components/HomePage';
import Catalog from './components/catalog/Catalog';
import UserProfile from './components/UserProfile';
import Messages from './components/UserProfile/Messages/Messages';
import Discussion from './components/UserProfile/Messages/MessageCard/Discussion';

import AuthRoute from './components/Guards/AuthRoute';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotFoundPage from './components/NotFoundPage';

import Create from './components/Create';
import Details from './components/Details';
import Edit from './components/Edit';
import IsOwner from './components/Guards/IsOwner';


function App() {
    return (
        <>
            <AuthProvider>
                <ArticleProvider>
                    <Header />
                    <section className="container">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="details/:artId" element={<Details />} />
                            <Route element={<AuthRoute />}>
                                <Route path="/create" element={<Create />} />
                                <Route path="/profile" element={<UserProfile />} />
                                <Route path="/messages/:userId" element={<Messages />} />
                                <Route path="/messages/:userId/:artId/:senderId" element={<Discussion />} />
                                <Route element={<IsOwner />}>
                                    <Route path="/edit/:artId" element={<Edit />} />
                                </Route>
                            </Route>
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </section>
                    <Footer />
                </ArticleProvider>
            </AuthProvider>
        </>

    );
}

export default App;
