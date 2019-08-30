import {  apiGetWithoutToken } from "../../services/api";
import { PATH_HOME } from "../../services/path/home";

async function getAll( props ){
    const loading = props.loading ? props.loading : function(){};
    let response = ""
    loading(true)
    try {
        response = await apiGetWithoutToken(`${PATH_HOME.HOME_BENEFIT}`)
        loading(false)
        return response
    } catch (error){
        loading(false)
        return error 
    }
}


const Benefit = {
    getAll : getAll
}

export default Benefit;