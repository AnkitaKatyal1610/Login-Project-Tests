import { GET_USERS_SUCCESS, GET_USERS_FAIL } from '../reducer/userReducer';
import { getUsers } from '../service/service';

export const getUsersAction = (params) => {
    return dispatch => {
        return getUsers(params).then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: GET_USERS_SUCCESS,
                    users: response.data.data
                })
            }
        }).catch(error => {
            if (error.response)
                dispatch({
                    type: GET_USERS_FAIL,
                    error: error.response.data.error
                })
        })
    }
}