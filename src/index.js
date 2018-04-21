import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import registerServiceWorker from './registerServiceWorker';
import Root from './routes';


ReactDOM.render(<Root />, document.getElementById('Root'));
registerServiceWorker();
 