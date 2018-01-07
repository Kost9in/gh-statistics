const Octokat = require('octokat');
const moment = require('moment');
const config = require('../config');

const octo = new Octokat(config.gitHubAccount || undefined);

const fetchAllItems = (entity, params) => {
	const items = [];
	const saveItemsAndFetchMoreIfNeeded = data => {
		items.push(...data.items);
		return data.nextPage ? data.nextPage.fetch().then(saveItemsAndFetchMoreIfNeeded) : items;
	};

	return entity.fetch(params).then(saveItemsAndFetchMoreIfNeeded);
};

module.exports = {
	getContributors: config => {
		const {
			owner = '',
			repo = '',
			limit = 5
		} = config;

		return octo.repos(owner, repo).stats.contributors.fetch().then(data => {
			const contributors = data.items.slice(-limit).map(item => ({
				id: item.author.id,
				login: item.author.login,
				avatar: item.author.avatarUrl,
				url: item.author.htmlUrl
			}));

			return contributors.reverse();
		});
	},
	getContributorCommits: config => {
		const per_page = 100;
		const {
			owner = '',
			repo = '',
			contributor = '',
			since = moment().subtract(12, 'months').unix()
		} = config;

		return fetchAllItems(octo.repos(owner, repo).commits, { author: contributor, since, per_page });
	}
};