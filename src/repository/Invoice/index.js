import { apiGetWithToken } from "../../services/api";
import { PATH_INVOICE } from "../../services/path/invoice";

async function get (props) {
  let params = props.params
  let response = ''
  try {
    response = await apiGetWithToken(`${PATH_INVOICE.INVOICE}/${params}`)
    return response
  } catch (error) {
    return error
  }
}

const Invoice = {
  get
}

export default Invoice