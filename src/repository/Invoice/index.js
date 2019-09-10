import { apiGetWithToken, apiPatchWithToken } from "../../services/api";
import { PATH_INVOICE } from "../../services/path/invoice";

async function get (props) {
  let invoiceId = props.invoiceId
  let response = ''
  try {
    response = await apiGetWithToken(`${PATH_INVOICE.INVOICE}/${invoiceId}`)
    return response
  } catch (error) {
    return error
  }
}

async function receivedOrder(props) {
  const loading = props.loading ? props.loading : function () { };
  const params = props.params
  let response = ""
  loading(true)
  try {
      response = await apiPatchWithToken(`${PATH_INVOICE.INVOICE_BY_RECEIVED }${params}`);
      loading(false)
      return response
  } catch (error){
      loading(false)
      return error
  }
}

const Invoice = {
  get : get,
  receivedOrder: receivedOrder
}

export default Invoice