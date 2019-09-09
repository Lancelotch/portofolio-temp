import {  apiGetWithToken, apiPostWithToken } from "../../services/api";
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

async function create (props) {
    const params = props.params
    let response = ''
    try {
        response = apiPostWithToken(PATH_ORDER.ORDER, params)
        return response
    } catch (error) {
        return error
    }
}

const Order = {
    getByStatus : getByStatus,
    create
}

export default Order;
