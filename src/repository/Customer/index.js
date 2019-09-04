import { apiGetWithToken, apiPostWithToken, apiPutWithToken } from "../../services/api";
import { PATH_CUSTOMER } from "../../services/path/customer";

async function get() {
  let response = "";
  try {
    response = await apiGetWithToken(PATH_CUSTOMER.CUSTOMER);
    return response;
  } catch (error) {
    return error;
  }
}

async function upload(props) {
  const loading = props.loading ? props.loading : function() {};
  let response = "";
  let params = props.formData;
  console.log("props", props)
  console.log("param", params)
  loading(true);
  try {
    response = await apiPostWithToken(PATH_CUSTOMER.CUSTOMER_UPLOAD, params);
    loading(false);
    return response;
  } catch (error) {
    loading(false);
    return error;
  }
}

async function put(props) {
  let response = "";
  let params = props;
  try {
    response = await apiPutWithToken(PATH_CUSTOMER.CUSTOMER, params);
    return response;
  } catch (error) {
    return error;
  }
}

const Customer = {
  get,
  upload,
  put
};

export default Customer;
