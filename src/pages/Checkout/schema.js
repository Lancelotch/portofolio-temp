import * as yup from 'yup'

const schemaOrder = yup.object().shape({
  customerAddressId : yup.string().required(),
  amount : yup.number().required(),
  items : yup.array().of(yup.object().shape({
    productId : yup.string().required(),
    shipment : yup.string().required(),
    quantity : yup.number().required(),
    variants : yup.array().required()
  }))
})

export default schemaOrder