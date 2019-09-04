import * as yup from 'yup'

const schemaPassword = yup.object().shape({
  email : yup.string().required().email()
})

export default schemaPassword