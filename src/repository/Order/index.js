import {  apiGetWithToken } from "../../services/api";
import { PATH_DASHBOARD_TAB } from "../../services/path/dashboard";

async function tabs(props) {
    const loading = props.loading ? props.loading : function () { };
    const productAlvailabel = props.productAlvailabel
    const value = props.value
    const sortListTabs = props.sortListTabs
    let response = ""
    loading(true)
    try {
        response = await apiGetWithToken(`${PATH_DASHBOARD_TAB.ORDER_STATUS_TAB_DASHBOARD}${value}${sortListTabs}`);
        productAlvailabel(false)
        loading(false)
        return response
    } catch (error) {
        loading(false)
        productAlvailabel(true)
    }
};

const Order = {
    tabs : tabs
}

export default Order;
