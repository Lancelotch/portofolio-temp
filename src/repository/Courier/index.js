import { apiPostWithToken } from '../../services/api'
import { PATH_COURIER } from '../../services/path/courier'

async function expedisi (props) {
  let params = props.params
  let response = ''
  try {
    response = await apiPostWithToken(PATH_COURIER.COURIER_JNE, params)
    return response
  } catch (error) {
    return error
  }
}

const Courier = {
  expedisi
}

export default Courier