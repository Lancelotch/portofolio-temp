import {   apiGetWithoutToken } from "../../services/api";
import { PATH_CATEGORY } from "../../services/path/category";

async function getBreadCrumb(props) {
    const loading = props.loading ? props.loading : function () { };
    const params = props.params
    let response = ""
    loading(true)
    try {
        response = await apiGetWithoutToken(`${PATH_CATEGORY.BREADCRUMB}/${params}`)
        loading(false)
        return response
    } catch (error) {
        loading(false)
        return error
    }
};

const Breadcrumb = {
    getBreadCrumb : getBreadCrumb
}

export default Breadcrumb;
