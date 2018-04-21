import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './component/App';

const Root = () => (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

export default Root;