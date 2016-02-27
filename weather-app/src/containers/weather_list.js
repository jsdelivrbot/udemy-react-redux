'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map.js';

class WeatherList extends Component {
	render() {
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th>City</th>
						<th>Temperature (K)</th>
						<th>Pressure (hPa)</th>
						<th>Humidity (%)</th>
					</tr>
				</thead>
				<tbody>
					{ this.props.weather.map(this.renderWeather) }
				</tbody>
			</table>
		);
	}

	renderWeather(forecast) {
		// Prepare chart data
		const temperatures = forecast.list.map(weather => weather.main.temp );
		const pressures = forecast.list.map(weather => weather.main.pressure );
		const humidities = forecast.list.map(weather => weather.main.humidity );
		// Destructuring
		const { lon, lat } = forecast.city.coord

		return (
			<tr key={ forecast.city.id }>
				<td>
					<GoogleMap lng={ lon } lat={ lat } />
				</td>
				<td>
					<Chart data={ temperatures } color={ 'orange' } units="K" />
				</td>
				<td>
					<Chart data={ pressures } color={ 'green' } units="hPa" />
				</td>
				<td>
					<Chart data={ humidities } color={ 'black' } units="%" />
				</td>
			</tr>
		);
	}
}

function mapStateToProps({ weather }) {
	return { weather };
}

export default connect(mapStateToProps)(WeatherList);
