// the connection!
const knex = require('../dbs');

module.exports = {
  create(tags) {
    return knex('tags')
      .returning('*')
      .insert(tags);
  },

  getTagsByRepoId(id) {
    return knex('tags')
      .returning('*')
      .where('repo_id', id);
  },
};
