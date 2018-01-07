import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {
	setRepo,
	fetchContributorsStart,
	fetchContributorsSuccess,
	fetchContributorsFailure,
	resetStatistics
} from 'actions';
import { getContributorsUrl } from 'utils/urls';

class Search extends Component {
	constructor(...props) {
		super(...props);

		this.state = {
			repoUrl: '',
		};
	}

	handleChangeRepoUrl(e) {
		this.setState({
			repoUrl: e.target.value,
		});
	};

	loadContributors(e) {
		if (e) {
			e.preventDefault();
		}

		this.props.loadContributors(this.state.repoUrl);
	}

	render() {
		const { contributors: { loading: isContributorsLoading, error }, isStatisticsLoading} = this.props;
		const loadContributors = this.loadContributors.bind(this);
		const isEmpty = this.state.repoUrl.trim() === '';

		return (
			<form onSubmit={loadContributors}>
				<div className="row search-container">
					<div className="col-sm-9">
						<TextField
							className="search-input"
							fullWidth={true}
							floatingLabelText="Repository URL"
							floatingLabelFixed={true}
							value={this.state.value}
							disabled={isContributorsLoading}
							errorText={error}
							onChange={this.handleChangeRepoUrl.bind(this)}
						/>
					</div>
					<div className="col-sm-3">
						<RaisedButton
							className="search-button"
							label={isContributorsLoading ? 'Searching...' : 'Search'}
							fullWidth={true}
							primary={true}
							disabled={isEmpty || isContributorsLoading || isStatisticsLoading}
							onClick={loadContributors}
						/>
					</div>
				</div>
			</form>
		);
	}
}

const mapStateToProps = state => ({
	repo: state.repo,
	contributors: state.contributors,
	isStatisticsLoading: state.statistics.loading,
});

const mergeProps = (stateProps, dispatchProps) => {
	const { repo, contributors } = stateProps;
	const { dispatch } = dispatchProps;

	const loadContributors = repoUrl => {
		if (repoUrl !== repo.url || contributors.error) {
			const repoUrlData = repoUrl.split('/');
			const repoIdx = repoUrlData[repoUrlData.length - 1] ? repoUrlData.length - 1 : repoUrlData.length - 2;
			const repoData = {
				url: repoUrl,
				owner: repoUrlData[repoIdx - 1],
				repo: repoUrlData[repoIdx]
			};

			dispatch(setRepo(repoData));
			dispatch(fetchContributorsStart());
			dispatch(resetStatistics());
			fetch(getContributorsUrl(repoData.owner, repoData.repo))
				.then(resp => {
					return resp.json().then(data => {
						if (resp.status >= 400) {
							const errorText = (resp.status === 404) ? 'Repository not found!' : (data.message || resp.statusText);
							throw new Error(errorText);
						} else {
							dispatch(fetchContributorsSuccess(data));
						}
					});
				})
				.catch(error => dispatch(fetchContributorsFailure(error.message)));
		}
	};

	return Object.assign({}, stateProps, dispatchProps, { loadContributors });
};

export default connect(mapStateToProps, null, mergeProps)(Search);