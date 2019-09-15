import React from 'react';
import { hydrate, render } from 'react-dom';
import './style/index.css';
import './style/App.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducer/index';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import MiniDrawer from '../src/layout/miniDrawer';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-145108416-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const rootElement = document.getElementById("Root");

if (rootElement.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
        <Router>
            <MiniDrawer/>               
        </Router>
    </Provider>, rootElement);
    registerServiceWorker();
} else {
  render( 
    <Provider store={store}>
        <Router>
            <MiniDrawer/>               
        </Router>
    </Provider>, rootElement);
    registerServiceWorker();
}
