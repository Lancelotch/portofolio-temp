import { apiGetWithoutToken } from "../../api/services";
import { PATH_PRODUCT } from "../../api/path";


async function getLimitProduct(props) {
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

async function getAllProduct(props){
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

const Product = {
    getLimitProduct: getLimitProduct,
    getAllProduct: getAllProduct
}

export default Product;