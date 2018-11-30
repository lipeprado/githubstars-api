import HTTPSTATUS from 'http-status';
import { githubApi } from '../helpers';
import queries from '../queries/repos.queries';
import _ from 'lodash';

export const index = async (req, res, next) => {
  const { username } = req.body;

  try {
    const repos = await queries.getAll(username);
    const response = await githubApi.get(`/users/${username}/starred`);
    const starredRepo = response.data.map(repo => {
      return {
        id: repo.id,
        username,
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
      };
    });

    if (!_.isEmpty(repos)) {
      const newRepos = await removingDuplicates(starredRepo, repos);
      const addedRepos = await queries.create(newRepos);
      return res.status(200).json({ addedRepos });
    } else {
      createRepos(starredRepo, res);
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getByUsername = async (req, res, next) => {
  const { username } = req.params;
  try {
    const repos = await queries.getAll(username);
    return res.status(200).json({ size: repos.length, repos });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const removingDuplicates = (arr1, arr2) => {
  const newValues = _.differenceWith(arr1, arr2, _.isEqual);
  return newValues;
};

const createRepos = async (repos, res) => {
  const created = await queries.create(repos);
  return res.status(200).json({ created });
};
