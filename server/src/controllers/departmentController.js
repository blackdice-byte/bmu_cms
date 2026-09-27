const Department = require('../models/Department');
const createCrudController = require('../utils/crudFactory');

module.exports = createCrudController(Department, {
  searchFields: ['name', 'summary'],
  publicFilter: { isPublished: true },
  defaultSort: 'name',
});
