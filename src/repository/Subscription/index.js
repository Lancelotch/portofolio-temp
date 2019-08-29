import { apiPostWithoutToken } from "../../services/api";
import { PATH_HOME } from "../../services/path/home";

async function add( props ){
    const loading = props.loading ? props.loading : function(){};
    const email = props.email
    let response = ""
    loading(true)
    try {
        response = await apiPostWithoutToken(`${PATH_HOME.HOME_SUBSCRIPTION}`, email)
        loading(false)
        return response
    } catch (error){
        loading(false)
        return error 
    }
}


const Subscription = {
    add : add
}

export default Subscription;