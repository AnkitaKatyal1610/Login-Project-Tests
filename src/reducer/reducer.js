const initState = {
    token: '',
    error: ''
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT'

export default (state = initState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, { token: action.token });
        case LOGIN_FAIL:
            return Object.assign({}, state, { error: action.error });
        case LOGOUT:
            return Object.assign({}, state, { token: '', error: '' });
        default: return state;
    }
}
