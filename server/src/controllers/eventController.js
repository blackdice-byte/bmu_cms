const Event = require('../models/Event');
const createCrudController = require('../utils/crudFactory');

module.exports = createCrudController(Event, {
  searchFields: ['title', 'location', 'category'],
  publicFilter: { isPublished: true },
  defaultSort: 'date',
});
