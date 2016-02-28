import React from 'react';
import { Component } from 'react';

export default class App extends Component {
	render() {
		return (
			<div>
				{/* Render nested child components from react-router */}
				{ this.props.children }
			</div>
		);
	}
}
