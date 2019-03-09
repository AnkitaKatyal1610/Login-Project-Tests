const initState = {
    users: [],
    error: ''
}

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAIL = 'GET_USERS_FAIL';

export default (state = initState, action) => {
    switch (action.type) {
        case GET_USERS_SUCCESS:
            return Object.assign({}, state, { users: action.users })
        case GET_USERS_FAIL:
            return Object.assign({}, state, { error: action.error })
        default: return state;
    }
}