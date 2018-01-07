import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'components/Loader';
import {Tabs, Tab} from 'material-ui/Tabs';
import Table from 'components/statistics/views/Table';
import Line from 'components/statistics/views/Line';
import Bar from 'components/statistics/views/Bar';
import Pie from 'components/statistics/views/Pie';

class Statistics extends Component {
	render() {
		const { statistics: { data, loading: isLoading, loaded: isLoaded, error }} = this.props;
		let statisticsList = null;

		if (error) {
			statisticsList = <div className="alert alert-danger">{error}</div>;
		} else if (data && data.length) {
			statisticsList =
				<div>
					<Tabs>
						<Tab label="Bar">
							<Bar data={data}/>
						</Tab>
						{(data.length > 1)
							? <Tab label="Line">
									<Line data={data}/>
								</Tab>
							: ''
						}
						<Tab label="Pie">
							<Pie data={data}/>
						</Tab>
						<Tab label="Table">
							<Table data={data}/>
						</Tab>
					</Tabs>
				</div>
				;
		} else if (isLoaded) {
			statisticsList = <div className="alert alert-info" role="alert">No commits found for last year.</div>;
		}

		return (
			<div className="statistics-container text-center">
				{isLoading
					? <Loader/>
					: statisticsList
				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	statistics: state.statistics
});

export default connect(mapStateToProps)(Statistics);