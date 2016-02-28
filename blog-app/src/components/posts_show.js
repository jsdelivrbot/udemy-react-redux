'use strict';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	componentWillMount() {
		// Before render, try to fetch the post.
		// this.props.params.id is from the url, react-router.
		this.props.fetchPost(this.props.params.id);
	}

	render() {
		const { post } = this.props;

		if (!post) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<Link to="/">Back To Index</Link>
				<button	className="btn btn-danger pull-xs-right"
					onClick={ this.onDeleteClick.bind(this) }>
					Delete
				</button>
				<h3>{ post.title }</h3>
				<h6>Categories: { post.categories }</h6>
				<p>{ post.content }</p>
			</div>
		);
	}

	onDeleteClick() {
		this.props.deletePost(this.props.params.id)
		.then(() => {
			this.context.router.push('/');
		});
	}
}

function mapStateToProps(state) {
	return { post: state.posts.post };
}

// Map dispatch function to props
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
