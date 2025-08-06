import * as yup from 'yup'

const loginSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required('Password is required'),
})

export default loginSchema
