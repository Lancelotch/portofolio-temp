import {  apiGetWithToken } from "../../services/api";
import { PATH_DASHBOARD_TAB } from "../../services/path/dashboard";

async function tabs(props) {
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

const Order = {
    tabs : tabs
}

export default Order;
