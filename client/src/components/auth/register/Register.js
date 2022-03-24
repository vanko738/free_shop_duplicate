import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { userSchema } from '../../../yupSchemaValidation/userValidation';
import Notification from '../../Notification/InputNotification/Notification'
import ServerError from '../../Notification/ServerError';

import { register } from '../../../services/user';
import UserContext from '../../../context/UserDataContext';

import './Register.css';

export default function Register() {

    const navigate = useNavigate();
    const [serverErr, setServerError] = useState([]);
    const { setUserData } = useContext(UserContext);

    async function handleSubmit(e) {
        const data = {
            username: e.username,
            email: e.email,
            password: e.password,
            rePass: e.rePass
        }

        try {
            const result = await register(data);
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
        <section className="register">
            <div className="register-box">
                <h1 className="register-box-title">Register</h1>
                <p className="register-untertitle">Please fill in this form to create an account.</p>

                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        rePass: ''
                    }}
                    validationSchema={userSchema}
                    onSubmit={handleSubmit}>
                    <Form className="register-form" >
                        <label htmlFor="username">Name</label>
                        <Field
                            type="text"
                            id="text"
                            name="username"
                        />
                        <ErrorMessage name="username" component={Notification} />


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

                        <label htmlFor="rePass">Confirm-Password</label>
                        <Field
                            type="password"
                            id="rePass"
                            name="rePass"
                        />
                        <ErrorMessage name="rePass" component={Notification} />

                        <input type="submit" className="registerbtn" value="Register" />
                    </Form>
                </Formik>
                {serverErr.error !== undefined ? <ServerError serverError={serverErr.error} /> : ""}
                <div className="signin">
                    <p>Already have an account?<Link to="/login">Sign in</Link>.</p>
                </div>
            </div>
        </section>
    )
}
