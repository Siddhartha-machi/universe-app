import * as Yup from 'yup'

const PostValidationSchema = Yup.object().shape({
    title : Yup.string()
    .min(3 , 'Title is too short!')
    .max(50 , "Titel can't be more than 50 characters!")
    .required('Post without a title would be boring!'),
    description : Yup.string()
    .min(3 , 'Description is too vague!')
    .max(50 , 'Description Must be less than 50 characters!')
    .required('Post without a description is hard to understand!')
})

const LoginValidationSchema = Yup.object().shape({
    username : Yup.string()
                    .email('Provide registered email id.')
                    .required('Email is required to login!'),
    password : Yup.string()
                    .required('Password is required!'),
    non_field_errors : Yup.array()
})




export {
    PostValidationSchema,
    LoginValidationSchema,
}