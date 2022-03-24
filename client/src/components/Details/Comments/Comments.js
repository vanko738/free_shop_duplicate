import React, { useContext, useEffect, useState } from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { commentSchema } from '../../../yupSchemaValidation/userValidation';
import Notification from '../../Notification/InputNotification/Notification';

import { useParams } from 'react-router';
import { createComment, getArtComments } from '../../../services/article';

import CommentCard from './CommentCard'
import MessageNot from '../../Notification/MessageNot/MessageNot';


import UserContext from '../../../context/UserDataContext';

import './Comments.css'
export default function Comments({ category }) {

    const { userData } = useContext(UserContext);
    const { artId } = useParams();

    const [data, setData] = useState([]);
    const [isHiden, setIsHiden] = useState(false);
    const [commentId, setCommentId] = useState('');
    const [serResp, setSerResp] = useState('');

    const hideHandler = (e) => {
        e.preventDefault();
        if (isHiden) {
            setIsHiden(false)
        } else {
            setIsHiden(true)
        }

    }
    useEffect(() => {
        getArtComments(artId)
            .then(res =>
                setData(res.comments)
            ).catch(err => {
                console.log(err.message);
            });
    }, [artId, commentId]);

    const submitComment = async (value, { resetForm }) => {

        const data = {
            artId,
            username: value.username,
            comment: value.comment,
            category
        }
        try {
            const result = await createComment(data);
            if (result.status !== 200) {
                throw new Error(result.message)
            }
            setSerResp(result.message);
            setCommentId(result._id);
        } catch (err) {
            console.log(err.message);
        }
        resetForm({ value: "" })
    }
    return (
        <div className="comments-box">
            <h2 className="comments-title">Comments</h2>
            {userData ? <Formik
                initialValues={{
                    username: '',
                    comment: ''
                }}
                validationSchema={commentSchema}
                onSubmit={submitComment}
            >
                <Form className="comment-form">
                    <Field
                        type="text"
                        id="inp-name"
                        name="username"
                        placeholder="Name ..."
                    />
                    <ErrorMessage name="username" component={Notification} />

                    <Field
                        as="textarea"
                        id="comment-area"
                        name="comment"
                        placeholder="Comment ..."
                        rows="4"
                        cols="100"
                    />
                    <ErrorMessage name="comment" component={Notification} />
                    <input type="submit" id="cm-submit" value="Post Comment" />
                </Form>
            </Formik> : ""}

            <MessageNot message={serResp} commentId={commentId} />
            <div className="cmt-container">
                {data.length > 0 ?
                    <button className="show-hide-comments" onClick={hideHandler}>{isHiden ? 'Hide Comments' : 'Show Comments'}</button>
                    : ""}

                {isHiden ? data.map(x => <CommentCard key={x._id} comment={x} />) : ""}
            </div>
        </div>
    )
}
