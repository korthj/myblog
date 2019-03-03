import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import './style/App.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducer/index';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import MiniDrawer from '../src/layout/miniDrawer';


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <MiniDrawer/>               
        </Router>
    </Provider>, 
    document.getElementById('Root'));
registerServiceWorker();
