const path = require('path');
const router = require('express').Router();
const moment = require('moment');
const github = require(path.resolve('server/utils/github'));
const errorParser = require(path.resolve('server/utils/error-parser'));

router.get('/:owner/:repo/contributors', function(req, res, next) {
	github.getContributors(req.params)
		.then(contributors => res.json(contributors))
		.catch(err => {
			const { message, status } = errorParser(err);
			const error = new Error(message);
			error.status = status;
			next(error);
		});
});

router.get('/:owner/:repo/contributors/:contributor', function(req, res, next) {
	github.getContributorCommits(req.params)
		.then(commits => {
			const commitsPerMonthObj = commits.reduce((result, { commit }) => {
				const month = moment(commit.author.date).format('MMMM YYYY');
				result[month] = result[month] ? result[month] + 1 : 1;
				return result;
			}, {});

			const commitsPerMonth = Object.keys(commitsPerMonthObj).map(month => {
				return {
					month,
					commits: commitsPerMonthObj[month]
				};
			});

			res.json(commitsPerMonth);
		})
		.catch(err => {
			const { message, status } = errorParser(err);
			const error = new Error(message);
			error.status = status;
			next(error);
		});
});

module.exports = router;