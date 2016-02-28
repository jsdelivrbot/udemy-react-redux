'use strict';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions';

class PostsNew extends Component {
	// We need access to the context object within our component instances to
	// access the router and redirect after successfull post creation.
	static contextTypes = {
		router: PropTypes.object
	};

	render() {
		// Comes from redux-form
		const { fields: { title, categories, content }, handleSubmit } = this.props;

		return (
			<form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
				<h3>Create a New Post</h3>
				<div className={ `form-group ${ title.touched && title.invalid ? 'has-danger' : '' }`}>
					<label>Title</label>
					{/* Destructure properties created from redux-form onto the inputs props */}
					<input type="text" className="form-control" { ...title } />
					<div className="text-help">{ title.touched && title.error }</div>
				</div>

				<div className={ `form-group ${ categories.touched && categories.invalid ? 'has-danger' : '' }`}>
					<label>Categories</label>
					<input type="text" className="form-control" { ...categories } placeholder="category1, category2" />
					<div className="text-help">{ categories.touched && categories.error }</div>
				</div>

				<div className={ `form-group ${ content.touched && content.invalid ? 'has-danger' : '' }`}>
					<label>Content</label>
					<textarea type="text" className="form-control" { ...content }></textarea>
					<div className="text-help">{ content.touched && content.error }</div>
				</div>

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}

	onSubmit(formProps) {
		this.props.createPost(formProps)
		.then(() => {
			// Blog post has been created, redirect to index.
			// We navigate by using this.context.router.push() with the new path to
			// navigate to.
			this.context.router.push('/');
		});
	}
}

// Form validator
function validate(values) {
	const errors = {};

	if (!values.title) {
		errors.title = 'Enter a title';
	}

	if (!values.categories) {
		errors.categories = 'Enter a comma separated list of categories';
	}

	if (!values.content) {
		errors.content = 'Enter some content';
	}

	// When we return a non-empty errors object, the form won't be submitted.
	return errors;
}

// Reference:
// redux-form behaves like connect (react-redux), so we can inject action creators.
// connect: firstArg is mapStateToProps, secondArg is mapDispatchToProps
// reduxForm: firstArg is config, secondArg is mapStateToProps, thirdArg is mapDispatchToProps

// redux-form will inject some helpers on our components this.props
export default reduxForm({
	form: 'PostsNewForm',
	fields: ['title', 'categories', 'content'],
	validate /* validator */
}, null, { createPost })(PostsNew);
