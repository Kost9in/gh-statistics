import actionNames from 'utils/constants/actions';

// Repo
export const setRepo = repoData => ({ type: actionNames.setRepo, data: repoData });

// Contributors
export const fetchContributorsStart = () => ({ type: actionNames.contributorsRequest, data: null });
export const fetchContributorsSuccess = data => ({ type: actionNames.contributorsSuccess, data });
export const fetchContributorsFailure = errorMessage => ({ type: actionNames.contributorsFailure, data: errorMessage });
export const setSelectedContributor = contributor => ({ type: actionNames.setSelectedContributor, data: contributor });

// Statistics
export const fetchStatisticsStart = () => ({ type: actionNames.statisticsRequest, data: null });
export const fetchStatisticsSuccess = data => ({ type: actionNames.statisticsSuccess, data });
export const fetchStatisticsFailure = errorMessage => ({ type: actionNames.statisticsFailure, data: errorMessage });
export const resetStatistics = () => ({ type: actionNames.resetStatistics, data: null });