import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import './style/post.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducer/index';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BlogMain from './component/BlogMain'; 
import ShowPost from './layout/ShowPost';
import AboutMe from './layout/AboutMe';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={ BlogMain } />
                <Route path="/posts/" component={ ShowPost } />
                <Route path="/me" component={ AboutMe } />                
            </div>
        </Router>
    </Provider>, 
    document.getElementById('Root'));
registerServiceWorker();
