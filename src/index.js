import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import registerServiceWorker from './registerServiceWorker';
import Route from './routes';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import promise  from 'redux-promise';
import reducers from './reducer/index';

const store = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={store(reducers)}>
        <Route />
    </Provider>, 
    document.getElementById('Root'));
registerServiceWorker();
 