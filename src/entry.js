import React from 'react';
import ReactDOM from 'react-dom';

import App from './reactApp/app.jsx';
import ApiWrapper from './reactApp/apiWrapper/apiWrapper.jsx';

const run = ()=>{
	ReactDOM.render(React.createElement(ApiWrapper, {App}), document.getElementById('react-app-container'));
};

if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body)
	run();
else
	window.addEventListener('DOMContentLoaded', run, false);
