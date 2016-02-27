'use strict';

// The SearchBar will need to trigger redux actions, so we'll make it a
// container.

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { term: '' };

		// We bind because the context of `this` will have changed, just like
		// event handlers we're used to in JS.
		// This is an alternative method to the typical approach we've done:
		// `onChange={ event => this.onInputChange(event) }`
		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	render() {
		return (
			<form onSubmit={ this.onFormSubmit } className="input-group">
				<input
					placeholder="Get a five-day forecase in your favorite citites"
					className="form-control"
					value={ this.state.term }
					onChange={ this.onInputChange }
					required />
				<span className="input-group-btn">
					<button type="submit" className="btn btn-secondary">Submit</button>
				</span>
			</form>
		);
	}

	onFormSubmit(event) {
		event.preventDefault();

		// Fetch weather data
		this.props.fetchWeather(this.state.term);

		// Clear input
		this.setState({ term: '' });
	}

	onInputChange(event) {
		this.setState({ term: event.target.value });
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
