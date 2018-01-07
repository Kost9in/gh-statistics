import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'components/Loader';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {
	setSelectedContributor,
	fetchStatisticsStart,
	fetchStatisticsSuccess,
	fetchStatisticsFailure
} from 'actions';
import { getStatisticsUrl } from 'utils/urls';

class ContributorsList extends Component {
	render() {
		let {
			contributors: { data, loading: isContributorsLoading },
			statistics: { loading: isStatisticsLoading },
			loadStatistics } = this.props;
		let contributorsList = null;

		if (data && data.length) {
			const listCls = `contributors-list${isStatisticsLoading ? ' disabled' : ''}`;
			contributorsList =
				<List className={listCls}>
					<Subheader className="title">Top-{data.length} Contributors</Subheader>
					{data.map(contributor => {
						const itemCls = `one-contributor${contributor.selected ? ' active' : ''}`;
						return (
							<ListItem
								className={itemCls}
								key={contributor.id}
								leftAvatar={<Avatar src={contributor.avatar}/>}
								primaryText={<p className="username">{contributor.login}</p>}
								onClick={loadStatistics.bind(this, contributor.login)}
							/>
						);
					})}
				</List>;
		}

		return (
			<div className="contributors-container text-center">
				{isContributorsLoading
					? <Loader/>
					: contributorsList
				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	repo: state.repo,
	contributors: state.contributors,
	statistics: state.statistics
});

const mergeProps = (stateProps, dispatchProps) => {
	const { repo, contributors, statistics } = stateProps;
	const { dispatch } = dispatchProps;

	const loadStatistics = contributor => {
		const selectedContributor = contributors.data.find(contributor => contributor.selected);
		const selectedContributorLogin = selectedContributor ? selectedContributor.login : null;

		if (selectedContributorLogin !== contributor || statistics.error) {
			dispatch(setSelectedContributor(contributor));
			dispatch(fetchStatisticsStart());
			fetch(getStatisticsUrl(repo.owner, repo.repo, contributor))
				.then(resp => {
					return resp.json().then(data => {
						if (resp.status >= 400) {
							const errorText = (resp.status === 404) ? 'Contributor not found!' : (data.message || resp.statusText);
							throw new Error(errorText);
						} else {
							dispatch(fetchStatisticsSuccess(data));
						}
					});
				})
				.catch(error => dispatch(fetchStatisticsFailure(error.message)));
		}
	};

	return Object.assign({}, stateProps, dispatchProps, { loadStatistics });
};

export default connect(mapStateToProps, null, mergeProps)(ContributorsList);