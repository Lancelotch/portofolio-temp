import {apiPostWithoutToken, apiGetWithoutToken } from "../../services/api";
import { PATH_PUBLIC } from "../../services/path/public";
import jmespath from "jmespath";
import auth from "./response/auth";


async function login(props) {
    const loading = props.loading ? props.loading : function() {};
    let response = ""
    loading(true);
    try {
        response = await apiPostWithoutToken(PATH_PUBLIC.PUBLIC_USER_LOGIN, props.param);
        response = jmespath.search(response, auth);
        loading(false);
    } catch (error) {
        response = jmespath.search(error.response, auth);
        loading(false);
    }
    return response;
};

async function register(props){
    const loading = props.loading ? props.loading : function(){};
    let response = "";
    loading(true);
    try {
        response = await apiPostWithoutToken(PATH_PUBLIC.PUBLIC_USER_REGISTER, props.param);
        response = jmespath.search(response, auth);
        loading(false);
    } catch (error){
        response = jmespath.search(error.response, auth);
        loading(false);
    }
    return response;
}

async function forgotPassword(props){
    const loading = props.loading ? props.loading : function () {};
    let response = ''
    const params = props.params
    loading(true)
    try {
        response = await apiGetWithoutToken(PATH_PUBLIC.PUBLIC_FORGOT_PASSWORD, params)
        return response
    }catch(error){
        loading(false)
        return error
    }
}

const authentication = {
    login: login,
    register: register,
    forgotPassword : forgotPassword
}

export default authentication;