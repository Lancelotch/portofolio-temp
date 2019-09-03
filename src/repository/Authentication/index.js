import {apiPostWithoutToken, apiGetWithoutToken } from "../../services/api";
import { PATH_PUBLIC } from "../../services/path/public";


async function login(props) {
    const loading = props.loading ? props.loading : function() {};
    let response = ""
    loading(true);
    try {
        response = await apiPostWithoutToken(PATH_PUBLIC.PUBLIC_USER_LOGIN, props.param);
        loading(false);
        return response;
    } catch (error) {
        loading(false);
        return error;
    }
};

async function register(props){
    const loading = props.loading ? props.loading : function(){};
    let response = "";
    loading(true);
    try {
        response = await apiPostWithoutToken(PATH_PUBLIC.PUBLIC_USER_REGISTER, props.param);
        loading(false);
        return response;
    } catch (error){
        loading(false);
        return error;
    }
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