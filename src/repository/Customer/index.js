import { apiGetWithToken, apiPutWithToken } from "../../services/api";
import { PATH_CUSTOMER } from "../../services/path/customer";

async function get(props) {
  const loading = props.loading && undefined ? props.loading : function() {};
  let response = "";
  loading(true);
  try {
    response = await apiGetWithToken(PATH_CUSTOMER.CUSTOMER);
    loading(false);
    return response;
  } catch (error) {
    loading(false);
    return error;
  }
}

async function update(props) {
  const loading = props.loading && undefined ? props.loading : function() {};
  let response = "";
  let params = props;
  loading(true);
  try {
    response = await apiPutWithToken(PATH_CUSTOMER.CUSTOMER, params);
    loading(false);
    return response;
  } catch (error) {
    loading(false);
    return error;
  }
}

const Customer = {
  get,
  update
};

export default Customer;
