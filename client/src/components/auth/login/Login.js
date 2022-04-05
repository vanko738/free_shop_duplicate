import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import Notification from '../../Notification/InputNotification/Notification'
import ServerError from '../../Notification/ServerError';

import { userLoginSchema } from '../../../yupSchemaValidation/userValidation';
import UserContext from '../../../context/UserDataContext';

import './Login.css';
import { login } from '../../../services/user';

export default function Login() {
    const navigate = useNavigate();
    const [serverErr, setServerError] = useState([]);
    const { setUserData } = useContext(UserContext);

    async function handleSubmit(e) {

        const data = {
            email: e.email,
            password: e.password
        }
        try {
            const result = await login(data);
            if (result.status === 404) {
                setServerError({ error: result.message })
            } else {
                setUserData(result);
                navigate('/catalog');
            }
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <section className="login">
            <div className="login-box">
                <h1>Login</h1>
                <p className="login-untertitle">Please enter your email and password.</p>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        rePass: ''
                    }}
                    validationSchema={userLoginSchema}
                    onSubmit={handleSubmit}>
                    <Form className="login-form">
                        <label htmlFor="email">Email</label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                        />
                        <ErrorMessage name="email" component={Notification} />

                        <label htmlFor="password">Password</label>
                        <Field
                            type="password"
                            id="password"
                            name="password"
                        />
                        <ErrorMessage name="password" component={Notification} />

                        <input type="submit" className="loginBtn" value="Login" />
                    </Form>
                </Formik>
                {serverErr.error !== undefined ? <ServerError serverError={serverErr.error} /> : ""}
                <div className="signup">
                    <p>Dont have an account? <Link to="/register">Sign up</Link>.</p>
                </div>
            </div>
        </section>
    )
}
