import React from 'react';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';
import {
	chart,
	axis,
	dependentAxis,
	axisLabel,
	line,
	tickLabelPadding,
	getTickFontSize,
	getTickMonthFormat
} from 'utils/constants/chartStyles';

export default props => {
	const { data } = props;
	const chartData = data.map(one => Object.assign({}, one, { label: one.commits })).reverse();
	const tickLabelsStyle = { tickLabels: {
		fontSize: getTickFontSize(chartData.length),
		padding: tickLabelPadding
	}};

	return (
		<VictoryChart
			theme={VictoryTheme.material}
			domainPadding={20}
			height={chart.height}
			padding={chart.padding}
		>
			<VictoryAxis crossAxis
	     style={Object.assign({}, axis, tickLabelsStyle)}
	     tickFormat={t => getTickMonthFormat(t, chartData.length)}
       standalone={false}
			/>
			<VictoryAxis dependentAxis crossAxis
       label="Commits"
       axisLabelComponent={<VictoryLabel dy={-8} style={axisLabel}/>}
       style={Object.assign({}, axis, dependentAxis)}
       standalone={false}
			/>
			<VictoryLine
				labelComponent={<VictoryLabel dy={5}/>}
				data={chartData}
				x="month"
				y="commits"
				style={line}
			/>
		</VictoryChart>
	);
};