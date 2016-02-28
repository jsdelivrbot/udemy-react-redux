'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
	// Only called once, not on subsequent renders.
	// Good point to load initial data.
	componentWillMount() {
		this.props.fetchPosts();
	}

	render() {
		return (
			<div>
				<div className="text-xs-right">
					<Link to="/posts/new" className="btn btn-primary">Add A Post</Link>
				</div>

				<h3>Posts</h3>
				<ul className="list-group">
					{ this.renderPosts() }
				</ul>
			</div>
		);
	}

	renderPosts() {
		return this.props.posts.map((post) => {
			return (
				<li className="list-group-item" key={ post.id }>
					<Link to={ `/posts/${post.id }`}>
						<span className="pull-xs-right">{ post.categories }</span>
						<strong>{ post.title }</strong>
					</Link>
				</li>
			);
		});
	}

}

function mapStateToProps(state) {
	return { posts: state.posts.all };
};

// Map dispatch function to props
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
