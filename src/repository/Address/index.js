import { apiGetWithToken, apiPostWithToken, apiPutWithToken, apiPatchWithToken, apiDeleteWithToken } from "../../services/api";
import { PATH_CUSTOMER } from "../../services/path/customer";

async function getAll(props) {
    const loading = props.loading ? props.loading : function() {};
    let response = "";
    loading(true);
    try {
        response = await apiGetWithToken(PATH_CUSTOMER.ADDRESS);
        loading(false);
        return response;
    } catch (error) {
        loading(false);
        return error;
    }
};


async function getListProvince(props) {
    const loading = props.loading ? props.loading : function() {};
    let response = "";
    loading(true);
    try {
        response = await apiGetWithToken(PATH_CUSTOMER.ADDRESS_PROVINCE);
        loading(false);
        return response;
    } catch (error) {
        loading(false);
        return error;
    }
};

async function getListCity(props) {
    const loading = props.loading ? props.loading : function() {};
    const params = props.params;
    let response = "";
    loading(true);
    try {
        response = await apiGetWithToken(PATH_CUSTOMER.ADDRESS_CITY, params);
        loading(false);
        return response;
    } catch (error) {
        loading(false);
        return error;
    }
};

async function getListSubdistrict(props) {
    const loading = props.loading ? props.loading : function() {};
    const params = props.params;
    let response = "";
    loading(true);
    try {
        response = await apiGetWithToken(PATH_CUSTOMER.ADDRESS_SUBDISTRICT, params);
        loading(false);
        return response;
    } catch (error) {
        loading(false);
        return error;
    }
};

async function get(props){
    const loading = props.loading ? props.loading : function() {};
    const params = props.params;
    let response = "";
    loading(true);
    try {
        response = await apiGetWithToken(`${PATH_CUSTOMER.ADDRESS}/${params}`);
        loading(false);
        return response;
    } catch (error) {
        loading(false);
        return error;
    }
}

async function getDefault(props){
    const loading = props.loading ? props.loading : function() {};
    const params = props.params;
    let response = "";
    loading(true);
    try {
        response = await apiGetWithToken(PATH_CUSTOMER.ADDRESS_DEFAULT, params);
        loading(false);
        return response;
    } catch (error) {
        loading(false);
        return error;
    }
}

async function updateDefault(props){
    const loading = props.loading ? props.loading : function() {};
    const params = props.params;
    let response = "";
    loading(true);
    try {
        response = await apiPatchWithToken(PATH_CUSTOMER.ADDRESS_DEFAULT, params);
        loading(false);
        return response;
    } catch (error) {
        loading(false);
        return error;
    }
}

async function create(props){
    const loading = props.loading ? props.loading : function() {};
    const params = props.params;
    console.log(params);
    let response = "";
    loading(true);
    try {
        response = await apiPostWithToken(PATH_CUSTOMER.ADDRESS, params);
        loading(false);
        return response;
    } catch (error) {
        loading(false);
        return error;
    }
}

async function update(props){
    const loading = props.loading ? props.loading : function() {};
    const params = props.params;
    let response = "";
    loading(true);
    try {
        response = await apiPutWithToken(PATH_CUSTOMER.ADDRESS, params);
        loading(false);
        return response;
    } catch (error) {
        loading(false);
        return error;
    }
}

async function Delete(props){
    const loading = props.loading ? props.loading : function() {};
    const params = props.params;
    let response = "";
    loading(true);
    try {
        response = await apiDeleteWithToken(`${PATH_CUSTOMER.ADDRESS}/${params}`);
        loading(false);
        return response;
    } catch (error) {
        loading(false);
        return error;
    }
}

const repositoryAddress = {
    getListProvince,
    getListCity,
    getListSubdistrict,
    create,
    get,
    getAll,
    getDefault,
    update,
    updateDefault,
    Delete
}

export default repositoryAddress;