import React, { useContext, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { sendMessage } from '../../../services/user';
import { sendMessageSchema } from '../../../yupSchemaValidation/userValidation';

import MessageNot from '../../Notification/MessageNot';
import Notification from '../../Notification/InputNotification/Notification'

import ArticleContext from '../../../context/ArticleContext';
import UserContext from '../../../context/UserDataContext';

import './SendMessage.css'

export default function SendMessage({ artOwnerName }) {

    const { currentArt } = useContext(ArticleContext);
    const { userData } = useContext(UserContext);

    const [send, setSend] = useState([]);
    const [msgIsSend, setMsgIsSend] = useState(false);


    async function submitHandler(value, { resetForm }) {
        const data = {
            username: userData.username,
            mail: userData.email,
            message: value.message,
            ownerId: currentArt.owner,
            userId: userData._id,
            articleId: currentArt._id
        }
        setMsgIsSend(false);
        try {
            const result = await sendMessage(data);
            if (result.status === 200) {
                setSend({ message: result.message });
                setMsgIsSend(true)
            }
        } catch (err) {
            setSend(err.message)
        }
        resetForm({ value: "" });
    }

    return (
        <>
            <article className="message-box">
                <h4 className="box-title">Send message to <span>{artOwnerName}</span></h4>
                <Formik
                    initialValues={{
                        message: ''
                    }}
                    validationSchema={sendMessageSchema}
                    onSubmit={submitHandler}>
                    <Form className="form">
                        <label htmlFor="username">Name</label>
                        <Field
                            type="text"
                            id="text-msg"
                            name="username"
                            value={userData.username}
                        />
                        <label htmlFor="email">Email</label>
                        <Field
                            type="email"
                            id="email-msg"
                            name="email"
                            value={userData.email}
                        />
                        <label htmlFor="message">Message</label>
                        <Field
                            as="textarea"
                            id="message-area"
                            name="message"
                            rows="4"
                            cols="50"
                        />
                        <ErrorMessage name="message" component={Notification} />

                        <div className="form-btn">
                            <input className="submit-btn" type="submit" value="Send" />
                            <input className="reset-btn" type="reset" value="Reset" />
                        </div>
                    </Form>
                </Formik>
                {msgIsSend ? <MessageNot message={send.message} /> : ""}
            </article>
        </>
    )
}
