exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', table => {
    table.increments();
    table.string('name');
    table.uuid('repo_id');
    table
      .foreign('repo_id')
      .references('id')
      .inTable('repos');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags');
};
