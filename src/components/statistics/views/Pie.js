import React from 'react';
import { VictoryPie, VictoryTheme, VictoryLabel } from 'victory';
import {
	pie,
	pieLabel
} from 'utils/constants/chartStyles';
import moment from 'moment/moment';

export default props => {
	const { data } = props;
	const pieData = data.map(({ month, commits }) => ({ x: month, y: commits }));

	return (
		<VictoryPie
			theme={VictoryTheme.material}
			height={pie.height}
			padding={pie.padding}
			innerRadius={pie.innerRadius}
			colorScale="blue"
			data={pieData}
			labels={d => `${moment(d.x).format('MMM YY')} (${d.y})`}
			labelRadius={pie.labelRadius}
			labelComponent={<VictoryLabel style={pieLabel}/>}
		/>
	);
};