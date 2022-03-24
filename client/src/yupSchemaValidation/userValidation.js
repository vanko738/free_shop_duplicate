import * as yup from 'yup';

const emailRegex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;

export const userSchema = yup.object().shape({
    username: yup.string().min(5).max(20).required('Username is required!'),
    email: yup.string().email('Wrong email').matches(emailRegex, 'Invalid Email!').required('Email is required!'),
    password: yup.string().min(4).max(15).required('Password is required!'),
    rePass: yup.string().oneOf([yup.ref("password"), null], 'Password must match!')
})

export const userLoginSchema = yup.object().shape({
    email: yup.string().email('Wrong email').matches(emailRegex, 'Invalid Email!').required('Email is required!'),
    password: yup.string().min(4).max(15).required('Password is required!'),
})

export const sendMessageSchema = yup.object().shape({
    message: yup.string().min(10, 'Minimum 10 character!').max(500, 'Maximum 500 character!').required(''),
})
export const commentSchema = yup.object().shape({
    username: yup.string().min(4).max(15).required('Name is required!'),
    comment: yup.string().min(5, 'Minimum 5 character!').max(500, 'Maximum 500 character!').required(''),
})