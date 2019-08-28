import { apiGetWithoutToken } from "../../services/api";
import { PATH_PRODUCT } from "../../api/path";


async function getLimit(props) {
    const loading = props.loading ? props.loading : function() {};
    let response = ""
    loading(true);
    try {
        response = await apiGetWithoutToken(PATH_PRODUCT.PRODUCT_ALL_LIMIT);
        loading(false)
        return response
    } catch (error) {
        loading(false)
        return error
    }
};

async function getAll(props){
    const loading = props.loading ? props.loading : function(){};
    let response = ""
    loading(true)
    try {
        response = await apiGetWithoutToken(PATH_PRODUCT.PRODUCT)
        loading(false)
        return response
    } catch (error){
        loading(false)
        return error 
    }
}

async function getByCategory( props ){
    const loading = props.loading ? props.loading : function(){};
    const params = props.params
    const categoryId = props.categoryId
    let response = ""
    loading(true)
    try {
        response = await apiGetWithoutToken(`${PATH_PRODUCT.PRODUCT_CATEGORY}/${categoryId}`, params)
        loading(false)
        return response
    } catch (error){
        loading(false)
        return error 
    }
}

const Product = {
    getLimit: getLimit,
    getAll: getAll,
    getByCategory: getByCategory
}

export default Product;