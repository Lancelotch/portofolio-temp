import { mainService, dummyService, dummyServiceLogin } from './httpClient';
import {PATH_PUBLIC, PATH_CATEGORY, PATH_HOME} from '../path'
import { resolve, reject } from 'q';
import { request } from 'http';

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

const sliderHome = () => {
    return new Promise((resolve, reject) => {
        dummyService
            .request({
                method: 'GET',
                url: PATH_HOME.HOME_SLIDER
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error.response)
            })
    })
}

const benefit = () => {
    return new Promise((resolve, reject) => {
        dummyService
            .request({
                method: 'GET',
                url: PATH_HOME.HOME_BENEFIT
            })
            .then(response =>
                resolve(response.data))
            .catch(error => {
                reject(error.response)
            })
    })
}

const subscription = request => {
    return new Promise((resolve, reject) => {
        dummyService
            .request({
                method: 'POST',
                url: PATH_HOME.HOME_SUBSCRIPTION,
                data: request
            })
            .then(response => 
                resolve(response.data))
            .catch(error => {
                reject(error.response)
            })
    })
}

const category = {
    categoryFeature : categoryFeature,
    sliderHome: sliderHome,
    benefit: benefit,
    subscription: subscription
}

export default category;
