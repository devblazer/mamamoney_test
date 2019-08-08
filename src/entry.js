import React from 'react';
import ReactDOM from 'react-dom';

import App from './reactApp/app.jsx';

const run = ()=>{
	ReactDOM.render(React.createElement(App), document.getElementById('react-app-container'));
};

if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body)
	run();
else
	window.addEventListener('DOMContentLoaded', run, false);
