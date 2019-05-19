import { serviceWithoutToken } from './httpClient';
import { PATH_SHIPPING} from '../path'


const getShipping = () => {  
    return new Promise((resolve,reject) => {
        serviceWithoutToken()
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