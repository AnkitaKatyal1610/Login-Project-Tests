import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';

import * as userActions from './userActions';
import { GET_USERS_SUCCESS } from '../reducer/userReducer';
import { baseService } from '../service/service';

let mockStore = configureMockStore([thunk]);
let mockService = new MockAdapter(baseService);

describe('user actions tests', () => {
    it('can pass GET_USERS_SUCCESS action', () => {
        let params = 1;
        mockService.onGet(`/users?page=${params}`).reply(200, {
            data: [
                {
                    id: 1,
                    first_name: "George",
                    last_name: "Bluth",
                    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg",
                },
                {
                    id: 2,
                    first_name: "Janet",
                    last_name: "Weaver",
                    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg",
                },
                {
                    id: 3,
                    first_name: "Emma",
                    last_name: "Wong",
                    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg",
                },
            ]
        })
        let expectedActions = [{
            type: GET_USERS_SUCCESS, users: [
                {
                    id: 1,
                    first_name: "George",
                    last_name: "Bluth",
                    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg",
                },
                {
                    id: 2,
                    first_name: "Janet",
                    last_name: "Weaver",
                    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg",
                },
                {
                    id: 3,
                    first_name: "Emma",
                    last_name: "Wong",
                    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg",
                },
            ]
        }]
        let store = mockStore({ users: [], error: '' });
        return store.dispatch(userActions.getUsersAction(params)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
})