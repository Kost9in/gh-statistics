import { apiUrl } from 'config';

export const getContributorsUrl = (owner, repo) => `${apiUrl}/repo/${owner}/${repo}/contributors`;
export const getStatisticsUrl = (owner, repo, login) => `${apiUrl}/repo/${owner}/${repo}/contributors/${login}`;