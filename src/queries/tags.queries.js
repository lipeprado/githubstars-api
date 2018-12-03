// the connection!
const knex = require('../dbs');

module.exports = {
  create(tags) {
    return knex('tags')
      .del('*')
      .returning('*')
      .insert(tags);
  },

  getTagsByRepoId(id) {
    return knex('tags')
      .returning('*')
      .where('repo_id', id);
  },
  deleteByRepoId(repoId) {
    return knex('tags')
      .where('repo_id', repoId)
      .del();
  },
  delete(id) {
    return knex('tags')
      .where('id', id)
      .del();
  },
};
