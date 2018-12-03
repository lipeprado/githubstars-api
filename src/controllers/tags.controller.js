import HTTPSTATUS from 'http-status';
import * as queries from '../queries/tags.queries';
import { formatingTags } from '../helpers';

export const index = async (req, res, next) => {
  const { tag } = req.body;
  const { repoId } = req.params;
  const formatedTag = formatingTags(tag, repoId);
  try {
    await queries.deleteByRepoId(repoId);
    const createdTag = await queries.create(formatedTag);
    return res.status(200).json({ createdTag });
  } catch (error) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({ error: 'Bad Request' });
  }
};

export const getTagsByRepoId = async (req, res, next) => {
  const { repoId } = req.params;
  try {
    const tagsByRepoId = await queries.getTagsByRepoId(repoId);
    return res.status(HTTPSTATUS.OK).json({ tagsByRepoId });
  } catch (error) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({ error });
  }
};

export const deleteTag = async (req, res, next) => {
  const { tagId } = req.params;
  try {
    await queries.delete(tagId);
    return res.status(HTTPSTATUS.OK).json({ message: 'Deleted with success.' });
  } catch (error) {
    return res
      .status(HTTPSTATUS.BAD_REQUEST)
      .json({ error: "Can't Delete Tag." });
  }
};
