const Staff = require('../models/Staff');
const createCrudController = require('../utils/crudFactory');

module.exports = createCrudController(Staff, {
  populate: { path: 'department', select: 'name slug' },
  searchFields: ['name', 'title'],
  publicFilter: { isPublished: true },
  defaultSort: 'order name',
});
