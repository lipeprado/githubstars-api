const Knex = require('../dbs');
const Bookshelf = require('bookshelf')(Knex);
import Tags from './tags.model';
Bookshelf.plugin('registry');
Bookshelf.plugin('visibility');

export default Bookshelf.Model.extend({
  tableName: 'repos',
  tags: function() {
    return this.hasMany(Tags);
  },
});
