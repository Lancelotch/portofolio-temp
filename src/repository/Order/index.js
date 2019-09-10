import {  apiGetWithToken, apiPatchWithToken } from "../../services/api";
import { PATH_DASHBOARD_TAB } from "../../services/path/dashboard";
import { PATH_ORDER } from '../../services/path/order'

async function getByStatus(props) {
    const loading = props.loading ? props.loading : function () { };
    const status = props.status
    const params = props.params
    let response = ""
    loading(true)
    try {
        response = await apiGetWithToken(`${PATH_DASHBOARD_TAB.ORDER_STATUS_TAB_DASHBOARD}/${status}`, params);
        loading(false)
        return response
    } catch (error) {
        loading(false)
        return error
    }
};

async function cancel(props) {
    const loading = props.loading ? props.loading : function () { };
    const idCancel = props.idCancel
    let response = ""
    loading(true)
    try {
        response = await apiPatchWithToken(`${PATH_ORDER.ORDER_BY_CANCEL}/${idCancel}`);
        loading(false)
        return response
    } catch (error){
        loading(false)
        return error
    }
}
 
const Order = {
    getByStatus: getByStatus,
    cancel : cancel
}

export default Order;
