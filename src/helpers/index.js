export { githubApi } from './axios';
import uuidv3 from 'uuid';

export const formatingTags = (tags, repoId) => {
  const toLower = tags.toLowerCase();
  const spliting = toLower.split(',');
  const uniq = new Set(spliting).toJSON();
  return uniq.map(tag => ({ repo_id: repoId, name: tag.trim() }));
};
export const formatingRepos = (repos, username) => {
  return repos.map(repo => {
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
};
