'use strict';

import { FETCH_WEATHER } from '../actions';

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_WEATHER:
			// Don't mutate state ([].push())! Return a new state:
			// return state.concat(action.payload.data);
			// Now with nicer ES2016 syntax:
			return [ action.payload.data, ...state ];
			break;
	}

	return state;
}
