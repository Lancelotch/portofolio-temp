import {apiPostWithoutToken } from "../../services/api";
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

const authentication = {
    login: login,
    register: register
}

export default authentication;