import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../reducer/reducer';
import { login } from '../service/service';

export const loginAction = (user) => {
    return (dispatch) => {
        return login(user).then(response => {
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                dispatch({ type: LOGIN_SUCCESS, token: response.data.token })
            }
        }).catch(error => {
            if (error.response) {
                dispatch({ type: LOGIN_FAIL, error: error.response.data.error })
            }
        })
    }
}

export const logoutAction = () => {
    return (dispatch) => {
        localStorage.removeItem('token');
        dispatch({ type: LOGOUT });
    }
}
