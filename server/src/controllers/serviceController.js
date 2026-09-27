const Service = require('../models/Service');
const createCrudController = require('../utils/crudFactory');

module.exports = createCrudController(Service, {
  populate: { path: 'department', select: 'name slug' },
  searchFields: ['name', 'summary'],
  publicFilter: { isPublished: true },
  defaultSort: 'name',
});
