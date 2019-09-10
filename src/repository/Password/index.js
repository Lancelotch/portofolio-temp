import { apiPostWithToken, apiGetWithToken, apiPostWithoutToken } from "../../services/api";
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

async function processReset (props) {
  const params = props.params
  const randomKey = props.randomKey
  let response = ''
  try {
    response = await apiPostWithoutToken(`${PATH_PUBLIC.PUBLIC_RESET_PASSWORD}/${randomKey}`, params)
    return response
  } catch (error) {
    return error
  }
}

const Password = {
  change,
  reset,
  processReset
}

export default Password