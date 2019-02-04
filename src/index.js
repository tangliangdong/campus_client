import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose} from 'redux'

import reducers from './reducer'
import './index.css';
import Login from './container/login/login'
import * as serviceWorker from './serviceWorker'
import Root from './container/root/root'
import AuthRouter from './component/authRouter/authRouter'
import AdminPage from './container/adminPage/adminPage'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

const store = createStore( reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
));

console.log(store.getState())

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRouter></AuthRouter>
        <Switch>
          <Route path="/index" component={Root}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/admin" component={AdminPage}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
