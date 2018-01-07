import moment from 'moment/moment';

// Bar & Line
export const chart = {
	height: 200,
	padding: { top: 10, bottom: 20, left: 25, right: 10 }
};
export const axis = {
	axis: { stroke: '#333' },
	grid: { stroke: '#bbb' },
	ticks: { size: 0 }
};
export const tickLabelPadding = 3;
export const dependentAxis = {
	tickLabels: { fontSize: 7, padding: tickLabelPadding }
};
export const axisLabel = { fontSize: 10 };
export const bar = {
	data: { fill: '#00bcd4' },
	labels: { fill: '#333', fontSize: 8 }
};
export const line = {
	data: { stroke: '#00bcd4' },
	labels: { fill: '#333', fontSize: 8 }
};
export const getTickFontSize = count => {
	if (count > 9) return 5;
	else if (count > 6) return 6;
	else return 7;
};
export const getTickMonthFormat = (tick, count) => {
	if (count > 8) return moment(tick).format('MMM YY');
	else if (count > 4) return moment(tick).format('MMM YYYY');
	else return tick;
};

// Pie
export const pie = {
	height: 200,
	padding: 30,
	innerRadius: 40,
	labelRadius: 85
};
export const pieLabel = { fontSize: 7 };