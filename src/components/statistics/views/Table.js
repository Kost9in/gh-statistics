import React from 'react';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';

export default ({ data }) => {
	return (
		<Table>
			<TableHeader
				displaySelectAll={false}
				adjustForCheckbox={false}
			>
				<TableRow>
					<TableHeaderColumn>Month</TableHeaderColumn>
					<TableHeaderColumn>Commits</TableHeaderColumn>
				</TableRow>
			</TableHeader>
			<TableBody
				displayRowCheckbox={false}
			>
				{data.map(({ month, commits }) => (
					<TableRow key={month}>
						<TableRowColumn>{month}</TableRowColumn>
						<TableRowColumn>{commits}</TableRowColumn>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};