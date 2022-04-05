import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { useNavigate } from 'react-router-dom';
import { animalsSchema } from '../../yupSchemaValidation/modelsValidation'
import Notification from '../Notification/InputNotification/Notification'

import { createArticle, updateArticle } from '../../services/article';
import { animalEditModel } from '../Edit/EditModel/editModel';

import ModelLayout from '../CategoryModels/Layout/ModelLayout';

export default function Animals(props) {

    const animalData = animalEditModel(props);
    const navigate = useNavigate();


    const createAnimalArticle = async (e) => {

        const data = {
            animalName: e.animalName,
            type: e.type,
            birthday: e.birthday,
            city: e.city,
            image: e.image,
            price: e.price,
            description: e.description,
            category: 'animals'
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

    const editAnimalArticle = async (e) => {
        const data = {
            animalName: e.animalName,
            type: e.type,
            birthday: e.birthday,
            city: e.city,
            image: e.image,
            price: e.price,
            description: e.description,
            category: 'animals'
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
                initialValues={animalData}
                validationSchema={animalsSchema}
                onSubmit={animalData.price ? editAnimalArticle : createAnimalArticle}
            >
                <Form>
                    <label htmlFor="animalName">Name</label>
                    <Field
                        type="text"
                        id="animalName"
                        name="animalName"
                    />
                    <ErrorMessage name="animalName" component={Notification} />

                    <label htmlFor="type">Type</label>
                    <Field
                        type="text"
                        id="type"
                        name="type"
                    />
                    <ErrorMessage name="type" component={Notification} />

                    <label htmlFor="birthday">Birthday</label>
                    <Field
                        type="date"
                        id="birthday"
                        name="birthday"
                    />
                    <ErrorMessage name="birthday" component={Notification} />

                    <ModelLayout data={animalData} />
                </Form>
            </Formik>
        </>
    )
}
