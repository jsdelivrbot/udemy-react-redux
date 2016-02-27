'use strict';

// SmartComponent or Container.
// Containers are components with access to the state in our store.
// When the state changes, this container will re-render.

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions';
import { bindActionCreators } from 'redux';

class BookList extends Component {
	render() {
		return (
			<ul className="list-group col-sm-4">
				{ this.renderList() }
			</ul>
		);
	}

	renderList() {
		return this.props.books.map(book => {
			return (
				<li
					key={ book.title }
					className="list-group-item"
					onClick={ () => this.props.selectBook(book) }>
					{ book.title }
				</li>
			);
		});
	}
}

function mapStateToProps(state) {
	// Whatever is returned will show up as props inside of BookList
	return {
		books: state.books
	};
}

// Anything returned from this function will end up as props on the BookList
// container.
function mapDispatchToProps(dispatch) {
	// Whenever selectBook is called, the result should be passed to all our
	// reducers.
	return bindActionCreators({ selectBook }, dispatch);
}

// Promote BookList from a component to a container. It needs to know about this
// new dispatch method, selectBook. Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
