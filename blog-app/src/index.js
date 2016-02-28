import React from 'react';
import ReactDOM from 'react-dom';
import RedusPromise from 'redux-promise';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import routes from './routes';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(RedusPromise)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		{/* Replaces our <App /> instance. */}
		<Router history={ browserHistory } routes={ routes } />
	</Provider>
	, document.querySelector('.container'));
