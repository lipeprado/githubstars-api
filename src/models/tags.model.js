const Knex = require('../dbs');
const Bookshelf = require('bookshelf')(Knex);
import Repos from './repos.model';

Bookshelf.plugin('registry');
Bookshelf.plugin('visibility');

export default Bookshelf.Model.extend({
  tableName: 'tags',
  repos: function() {
    return this.belongsToMany(Repos);
  },
});
