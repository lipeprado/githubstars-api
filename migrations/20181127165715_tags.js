exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', table => {
    table.increments();
    table.string('name');
    table.integer('repoId');
    table
      .foreign('repoId')
      .references('id')
      .inTable('repos');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags');
};
