// the connection!
const knex = require('../dbs');

module.exports = {
  getAll(username) {
    return knex('repos').where({ username });
  },
  create(repos) {
    return knex('repos')
      .returning('*')
      .insert(repos);
  },
  update(id, repo) {
    return knex('repos')
      .where('id', id)
      .update(repo, '*');
  },
  getOne(username) {
    return knex('repos')
      .where('username', username)
      .first();
  },
  delete(id) {
    return knex('repos')
      .where('id', id)
      .del();
  },
};
