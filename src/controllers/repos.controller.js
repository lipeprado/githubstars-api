import HTTPSTATUS from 'http-status';
import { githubApi, formatingRepos } from '../helpers';
import queries from '../queries/repos.queries';
import _ from 'lodash';
import reposModel from '../models/repos.model';

export const index = async (req, res, next) => {
  const { username } = req.body;
  try {
    const dbRepos = await queries.getAll(username);
    const response = await githubApi.get(`/users/${username}/starred`);
    const [dataBaseRepos, apiRepos] = await Promise.all([dbRepos, response]);
    if (dbRepos.length <= 0) {
      createRepos(formatingRepos(apiRepos.data, username), res);
    } else {
      const newRepos = removingDuplicates(
        formatingRepos(apiRepos.data, username),
        dataBaseRepos,
      );
      if (newRepos.length > 0) {
        createRepos(newRepos, res);
      } else {
        return res.status(200).json({ dataBaseRepos });
      }
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: error, message: 'Somenthing wrong happen here.' });
  }
};

const createRepos = async (repos, res) => {
  try {
    await queries.create(repos);
    return res.status(200).json({});
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getByUsername = async (req, res, next) => {
  const { username } = req.params;
  try {
    const repos = await reposModel
      .where({ username: username })
      .fetchAll({ withRelated: ['tags'] });

    return res.status(200).json({ repos });
  } catch (error) {
    return res.status(400).json({ error: 'Nothing to show.' });
  }
};

const removingDuplicates = (apiRepos, dbRepos) => {
  const newValues = _.differenceBy(apiRepos, dbRepos, 'name');
  return newValues;
};
