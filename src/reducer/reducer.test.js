import reducer, { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './reducer'

describe('Test user login reducer', () => {

    it('has default state as empty', () => {
        expect(reducer(undefined, { type: undefined })).toEqual({
            "error": "", "token": ""
        })
    })

    it('can change state when LOGIN_SUCCESS action is received', () => {
        expect(reducer(undefined, { type: LOGIN_SUCCESS, token: 'abcd' })).toEqual({
            "error": "", "token": "abcd"
        })
    })

    it('can change state when LOGIN_FAIL action is received', () => {
        expect(reducer(undefined, { type: LOGIN_FAIL, error: 'Login failed' })).toEqual({
            "error": "Login failed", "token": ""
        })
    })

    it('can change state when LOGOUT action is received', () => {
        expect(reducer(undefined, { type: LOGOUT })).toEqual({
            "error": "", "token": ""
        })
    })
})