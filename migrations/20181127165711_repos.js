exports.up = function(knex, Promise) {
  return knex.schema.createTable('repos', table => {
    table
      .uuid('id')
      .notNullable()
      .primary();
    table.string('name');
    table.string('username');
    table.text('description');
    table.string('url');
    table.string('language');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('repos');
};
