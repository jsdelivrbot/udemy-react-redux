'use strict';

import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyCse7PxZPONN_23ZHPF68xYCu6xPqbtod8';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null
		};

		// Load some videos
		this.videoSearch('surfboards');
	}

	videoSearch(term) {
		YTSearch({ key: API_KEY, term: term }, (videos) => {
			// ES2016 shortcut { videos: videos } => { videos }
			// Works when key and property have the same name
			this.setState({
				videos,
				selectedVideo: videos[0]
			});
		});
	}

	render() {
		// Throttle search input
		const videoSearch = _.debounce((term) => { this.videoSearch(term); }, 300);

		return (
			<div>
				<SearchBar onSearchTermChange={ videoSearch } />
				<VideoDetail video={ this.state.selectedVideo } />
				<VideoList
					onVideoSelect={ selectedVideo => this.setState({ selectedVideo }) }
					videos={ this.state.videos } />
			</div>
		);
	}
}

// Take App component's generated HTML and put in on the page.
// Using a JSX tag such as <App /> creates and `instance` of a
// JSX component.
ReactDOM.render(<App />, document.querySelector('.container'));
