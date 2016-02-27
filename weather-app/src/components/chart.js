'use strict';

import _ from 'lodash';
import React from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

// No need for local state, functional component.
export default (props) => {
	return (
		<div>
			<Sparklines data={props.data} limit={5} width={180} height={120}>
				<SparklinesLine color={ props.color } />
				<SparklinesReferenceLine type="avg" />
			</Sparklines>

			<div>{ average(props.data) } { props.units }</div>
		</div>
	);
}

function average(data) {
	return Math.round(_.sum(data) / data.length);
}
