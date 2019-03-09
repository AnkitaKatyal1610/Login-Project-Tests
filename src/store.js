import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from './reducer/rootReducer';
const composeEnhancer = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancer(applyMiddleware(thunk));

const state = {
    auth:
    {
        token: '',
        error: ''
    },
    user: {
        users: [],
        error: ''
    }
}
const store = createStore(rootReducer, state, enhancer);

export default store;