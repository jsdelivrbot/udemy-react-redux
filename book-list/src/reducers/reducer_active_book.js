'use strict';

// `state` argument is not application state, only the state this reducer is
// responsible for. It's current state.
//
// Don't modify state, return new state.
export default function(state = null, action) {
	switch (action.type) {
		case 'BOOK_SELECTED':
			return action.payload;
	}

	// Nothing new here.
	return state;
}
