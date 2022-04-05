import * as yup from 'yup';

export const carsSchema = yup.object().shape({
    marke: yup.string().required('Marke is required!'),
    model: yup.string().required('Model is required!'),
    year: yup.date('Invalid Date!').min(1950).max(2021).required('Date is required!'),
    city: yup.string().required('City is required!'),
    image: yup.string().matches(/^https?:\/\//,['The Home Image should starts with http:// or https://.']).required('Image is required!'),
    price: yup.number('Price must be positive number!').min(1).required('Price is required!'),
    description: yup.string().required('Description is required!').max(1000, 'Description should be a maximum of 1000 characters long')
})

export const animalsSchema = yup.object().shape({
    animalName: yup.string().min(4).max(15).required('Name is required!'),
    type: yup.string().required('Type is required!'),
    birthday: yup.date().min(1960).max(2021).required('Date is required!'),
    city: yup.string().required('City is required!'),
    image: yup.string().matches(/^https?:\/\//,['The Home Image should starts with http:// or https://.']).required('Image is required!'),
    price: yup.number('Price must be positive number!').min(1).required('Price is required!'),
    description: yup.string().required('Description is required!').max(1000, 'Description should be a maximum of 1000 characters long')
})

export const clothesSchema = yup.object().shape({
    marke: yup.string().max(15).required('Marke is required!'),
    type: yup.string().required('Type is required!'),
    size: yup.string().required('Size is required!'),
    year: yup.date().min(1960).max(2021).required('Date is required!'),
    city: yup.string().required('City is required!'),
    image: yup.string().matches(/^https?:\/\//,['The Home Image should starts with http:// or https://.']).required('Image is required!'),
    price: yup.number('Price must be positive number!').min(1).required('Price is required!'),
    description: yup.string().required('Description is required!').max(1000, 'Description should be a maximum of 1000 characters long')
})
