import { mainService, dummyService } from './httpClient';
import {PATH_PUBLIC, PATH_CATEGORY} from '../path'
import { resolve, reject } from 'q';

const categoryFeature = () => {
    return new Promise((resolve,reject) => {
        dummyService
            .request({
                method: 'GET',
                url: PATH_CATEGORY.CATEGORY_FEATURE
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error.response)
            })
    })
}

const category = {
    categoryFeature : categoryFeature
}

export default category;
