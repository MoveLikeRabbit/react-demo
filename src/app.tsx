import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './lib/es6-polyfill';

import { AppRouter } from './router';
import './style/main.less';

render((
    <BrowserRouter basename="/smart/deploy">
        <AppRouter />
    </BrowserRouter>
), document.getElementById('app'));