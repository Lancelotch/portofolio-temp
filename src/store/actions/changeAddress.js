import axios from "axios";
import urls from "../../api/urls";


export const actionAddress = (request, token) => ({
    action: 'CHANGE_ADDRESS',
    payload: axios.post(urls.mainServices+urls.ChangeAddressDefault, request, {
        headers: {
            Authorization: "Bareer" + token
        }
    })
})

export const changeAddress = (id) => ({
    type: 'CHANGE_ADDRESS',
    payload: id
})