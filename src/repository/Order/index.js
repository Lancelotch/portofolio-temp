import {  apiGetWithToken } from "../../services/api";
import { PATH_DASHBOARD_TAB } from "../../services/path/dashboard";

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

const Order = {
    getByStatus : getByStatus
}

export default Order;
