export { githubApi } from './axios';

export const formatingTags = (tags, repoId) => {
  const toLower = tags.toLowerCase();
  const spliting = toLower.split(',');
  const uniq = new Set(spliting).toJSON();
  return uniq.map(tag => ({ repo_id: repoId, name: tag.trim() }));
};
