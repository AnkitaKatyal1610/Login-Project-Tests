import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import * as loginActions from './action';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../reducer/reducer';
import { baseService } from '../service/service';

const mockStore = configureMockStore([thunk]);
const mockService = new MockAdapter(baseService);

describe('Login Action tests', () => {
    it('can pass LOGIN_SUCCESS action', () => {
        let user = { email: "test@test.com", password: "test" };
        mockService.onPost('/login', user).reply(200, {
            token: "QpwL5tke4Pnpja7X"
        })

        let expectedActions = [{ type: LOGIN_SUCCESS, token: "QpwL5tke4Pnpja7X" }];
        const store = mockStore({ token: "", error: "" });
        return store.dispatch(loginActions.loginAction(user)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('can pass LOGIN_FAIL action if password is missing', () => {
        let user = { email: "test@test.com" };
        mockService.onPost('/login', user).reply(400, {
            error: "Missing password"
        })

        let expectedActions = [{ type: LOGIN_FAIL, error: "Missing password" }];
        const store = mockStore({ token: "", error: "" });
        return store.dispatch(loginActions.loginAction(user)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('can pass LOGIN_FAIL action if username or email are missing', () => {
        let user = { password: "test" };
        mockService.onPost('/login', user).reply(400, {
            error: "Missing email or username"
        })

        let expectedActions = [{ type: LOGIN_FAIL, error: "Missing email or username" }];
        const store = mockStore({ token: "", error: "" });
        return store.dispatch(loginActions.loginAction(user)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('can pass LOGIN_FAIL action if no credentials are found', () => {
        let user = {};
        mockService.onPost('/login', user).reply(400, {
            error: "Missing email or username"
        })

        let expectedActions = [{ type: LOGIN_FAIL, error: "Missing email or username" }];
        const store = mockStore({ token: "", error: "" });
        return store.dispatch(loginActions.loginAction(user)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('can pass LOGOUT action', () => {
        let expectedActions = [{ type: LOGOUT }];
        const store = mockStore({ token: "", error: "" });
        store.dispatch(loginActions.logoutAction());
        expect(store.getActions()).toEqual(expectedActions);
    })
})