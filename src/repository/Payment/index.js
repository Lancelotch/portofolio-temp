import { apiGetWithToken } from "../../services/api";
import { PATH_ORDER } from "../../services/path/order";

async function get (props) {
  let paymentId = props.paymentId
  let response = ''
  try {
    response = await apiGetWithToken(`${PATH_ORDER.ORDER_PAYMENT_INFO }/${paymentId}`)
    return response
  } catch (error) { 
    return error
  }
}

const Payment = {
  get
}

export default Payment