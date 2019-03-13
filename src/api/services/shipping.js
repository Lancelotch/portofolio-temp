import { mainService, dummyService, dummyServiceLogin } from './httpClient';
import { PATH_PRODUCT, PATH_SHIPPING} from '../path'


const getShipping = () => {  
    return new Promise((resolve,reject) => {
        dummyServiceLogin
            .request({
                method: 'GET',
                url: PATH_SHIPPING.SHIPPING
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error.response)
            })
    })
}

const shipping = {
    getShipping : getShipping
}

export default shipping;