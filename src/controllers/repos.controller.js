import HTTPSTATUS from 'http-status';
import { githubApi } from '../helpers';
import queries from '../queries/repos.queries';
import _ from 'lodash';
import reposModel from '../models/repos.model';
import uuidv3 from 'uuid';

export const index = async (req, res, next) => {
  const { username } = req.body;

  try {
    const repos = queries.getAll(username);
    const response = githubApi.get(`/users/${username}/starred`);
    const [dataBaseRepos, apiRepos] = await Promise.all([repos, response]);
    const starredRepo = apiRepos.data.map(repo => {
      const newRepo = {
        id: uuidv3.v4(),
        username,
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
      };
      return newRepo;
    });

    if (!_.isEmpty(dataBaseRepos)) {
      const newRepos = await removingDuplicates(starredRepo, dataBaseRepos);
      if (!_.isEmpty(newRepos)) {
        const addedRepos = await queries.create(newRepos);
        return res.status(200).json({ addedRepos });
      }
      return res
        .status(HTTPSTATUS.NO_CONTENT)
        .json({ message: 'Nothing to add' });
    } else {
      createRepos(starredRepo, res);
    }
  } catch (error) {
    return res.status(400).json({ error: 'Somenthing wrong happen here.' });
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

const removingDuplicates = (arr1, arr2) => {
  const newValues = _.differenceWith(arr1, arr2, _.isEqual);
  return newValues;
};

const createRepos = async (repos, res) => {
  const created = await queries.create(repos);
  return res.status(200).json({ created });
};
