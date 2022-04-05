import React from 'react'
import { Field, ErrorMessage } from 'formik';
import Notification from '../../Notification/InputNotification/Notification'


export default function ModelLayout({ data }) {
    return (
        <>
            <label htmlFor="city">City</label>
            <Field
                type="text"
                id="city"
                name="city"
            />
            <ErrorMessage name="city" component={Notification} />

            <label htmlFor="image">Image</label>
            <Field
                type="text"
                id="image"
                name="image"
                placeholder="Please use the URL address of the selected picture!"
            />
            <ErrorMessage name="image" component={Notification} />

            <label htmlFor="price">Price</label>
            <Field
                type="number"
                id="price"
                name="price"
            />
            <ErrorMessage name="price" component={Notification} />
            <label htmlFor="description">Description</label>
            <Field
                as="textarea"
                id="description"
                name="description"
                rows="4"
                cols="50"
            />
            <ErrorMessage name="description" component={Notification} />
            {data.price ? <input type="submit" className="createArtBtn" value="Edit Article" /> :
                <input type="submit" className="createArtBtn" value="Create Article" />}
        </>
    )
}
