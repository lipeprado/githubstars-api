const Knex = require('../dbs');
const Bookshelf = require('bookshelf')(Knex);

Bookshelf.plugin('registry');
Bookshelf.plugin('visibility');

export default Bookshelf.Model.extend({
  tableName: 'tags',
});
