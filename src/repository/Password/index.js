import { apiPostWithToken, apiGetWithToken } from "../../services/api";
import { PATH_PUBLIC } from "../../services/path/public";

async function change (props) {
  let params = props.params
  let response = ''
  try {
    response = await apiPostWithToken(PATH_PUBLIC.PUBLIC_CHANGE_PASSWORD,params);
    return response
  } catch (error) {
    return error
  }
};

async function reset (){
  let response = ''
  try {
    response = await apiGetWithToken(PATH_PUBLIC.PUBLIC_RESET_PASSWORD);
    return response
  } catch(error){
    return error
  }
}

const Password = {
  change,
  reset
}

export default Password