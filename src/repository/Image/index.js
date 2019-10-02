import { apiPostWithToken } from "../../services/api";
import { PATH_CUSTOMER } from "../../services/path/customer";

async function upload(props) {
  const loading = props.loading ? props.loading : function() {};
  let response = "";
  let params = props.params;
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

async function uploadImage(props) {
  const loading = props.loading ? props.loading : function() {};
  let response = "";
  let params = props.params;
  loading(true);
  try {
    response = await apiPostWithToken(PATH_CUSTOMER.CUSTOMER_UPLOAD_IMAGE, params);
    loading(false);
    return response;
  } catch (error) {
    loading(false);
    return error;
  }
}

const Image = {
  upload,
  uploadImage
};

export default Image;
