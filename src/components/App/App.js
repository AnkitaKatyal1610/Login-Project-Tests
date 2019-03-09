import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from '../../store';
import Login from '../Login/login';
import Register from '../Register/register'
import Homepage from '../Homepage/homepage';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <Switch>
            <Route exact={true} path='/' component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/homepage' component={Homepage} />
            <Route path='/register' component={Register} />
          </Switch>
        </Provider>
      </Router>
    );
  }
}

export default App;
