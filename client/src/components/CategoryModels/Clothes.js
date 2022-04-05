import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { useNavigate } from 'react-router-dom';
import { clothesSchema } from '../../yupSchemaValidation/modelsValidation';
import Notification from '../Notification/InputNotification/Notification'

import { createArticle, updateArticle } from '../../services/article';
import { clothesEditModel } from '../Edit/EditModel/editModel';

import ModelLayout from '../CategoryModels/Layout/ModelLayout';

export default function Clothes(props) {

    const dressData = clothesEditModel(props);

    const navigate = useNavigate();

    const createDress = async (e) => {
        const data = {
            marke: e.marke,
            type: e.type,
            size: e.size,
            year: e.year,
            city: e.city,
            image: e.image,
            price: e.price,
            description: e.description,
            category: 'clothes'
        }
        try {
            const result = await createArticle(data);
            if (result.status === 404) {
                throw new Error(result.message)
            } else {
                navigate('/catalog');
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    const editDress = async (e) => {
        const data = {
            marke: e.marke,
            type: e.type,
            size: e.size,
            year: e.year,
            city: e.city,
            image: e.image,
            price: e.price,
            description: e.description,
            category: 'clothes'
        }
        try {
            const result = await updateArticle(props.artId, data);
            if (result.status === 404) {
                throw new Error(result.message)
            } else {
                navigate('/catalog');
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            <Formik
                initialValues={dressData}
                validationSchema={clothesSchema}
                onSubmit={dressData.price ? editDress : createDress}
            >

                <Form>
                    <label htmlFor="marke">Marke</label>
                    <Field
                        type="text"
                        id="marke"
                        name="marke"
                    />
                    <ErrorMessage name="marke" component={Notification} />

                    <label htmlFor="type">Type</label>
                    <Field
                        type="text"
                        id="type"
                        name="type"
                    />
                    <ErrorMessage name="type" component={Notification} />

                    <label htmlFor="size">Size</label>
                    <Field
                        type="string"
                        id="size"
                        name="size"
                    />
                    <ErrorMessage name="size" component={Notification} />

                    <label htmlFor="year">Produced on:</label>
                    <Field
                        type="date"
                        id="year"
                        name="year"
                    />
                    <ErrorMessage name="year" component={Notification} />

                    <ModelLayout data={dressData} />
                </Form>
            </Formik>
        </>
    )
}
