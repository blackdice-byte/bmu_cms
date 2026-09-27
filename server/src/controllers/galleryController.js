const Gallery = require('../models/Gallery');
const createCrudController = require('../utils/crudFactory');

module.exports = createCrudController(Gallery, {
  searchFields: ['title', 'category'],
  publicFilter: { isPublished: true },
  defaultSort: 'order -createdAt',
});
