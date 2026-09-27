const Program = require('../models/Program');
const createCrudController = require('../utils/crudFactory');

module.exports = createCrudController(Program, {
  populate: { path: 'department', select: 'name slug' },
  searchFields: ['name', 'summary'],
  publicFilter: { isPublished: true },
  defaultSort: 'name',
});
